import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
    private readonly rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Separo o DTO em 3 partes para facilitar a manipulação
    const { authLogin, roleId, ...profileData } = createUserDto;

    // Verifica se o email existe
    const emailExists = await this.findOneByEmail(authLogin.email);
    if (emailExists) {
      throw new ConflictException(`Email "${authLogin.email}" is already in use.`);
    }

    // Verifica se a role existe
    const role = await this.rolesService.findOne(roleId);
    if (!role) {
      throw new NotFoundException(`Role with ID "${roleId}" not found.`);
    }

    // Cria um hash da senha
    const hashedPassword = await hash(authLogin.password, 10);

    // Cria a nova entidade 
    const newUser = this.usersRepository.create({
      ...profileData,
      authLogin: {
        email: authLogin.email,
        password: hashedPassword,
      },
      userRole: role,
    });

    // Salva a entidade no banco
    return await this.usersRepository.save(newUser);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ 
      where: {
        authLogin: {
          email: email,
        },
      },
    });
  }

  findAll() {
    return this.usersRepository.find({
      relations: {
        userRole: true,
      },
    });
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        userRole: true,
      },
    });
  }

  /**
   * Eu decidir comentar esse método porque achei que ele ficou um pouco mais difícil de se entender de primeira 
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Garantimos que o usuário que vamos editar existe
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    /**
     * Se um novo email foi enviado, checamos se ele já pertence a outro usuário 
     */
    if (updateUserDto.authLogin?.email) {
      const emailOwner = await this.findOneByEmail(updateUserDto.authLogin.email);
      if (emailOwner && emailOwner.id !== id) {
        throw new ConflictException(
          `O email "${updateUserDto.authLogin.email}" já está em uso`,
        );
      }
    }

    /**
     * Construímos um objeto apenas com os dados que serão atualizados no banco
     */
    const { roleId, authLogin, ...otherData } = updateUserDto;
    const partialEntity: QueryDeepPartialEntity<User> = {
      ...otherData, // Adiciona campos simples como name, birthDate, etc.
    };

    if (authLogin) {
      partialEntity.authLogin = {};
      if (authLogin.email) {
        partialEntity.authLogin.email = authLogin.email;
      }
      if (authLogin.password) {
        partialEntity.authLogin.password = await hash(authLogin.password, 10);
      }
    }

    if (roleId) {
      const role = await this.rolesService.findOne(roleId);
      if (!role) {
        throw new NotFoundException(`Role with ID "${roleId}" not found.`);
      }
      partialEntity.userRole = role;
    }
    
    partialEntity.updatedAt = new Date();

    /**
     * Agora que os dados estão prontos e validados, aplicamos a atualização
     */ 
    await this.usersRepository.update(id, partialEntity);


    return this.findOne(id);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }

  /**
   * Hasheia e salva o refresh token para um usuário específico.
   * Chamado durante o login bem-sucedido.
   */
  async setCurrentRefreshToken(refreshToken: string, userId: string): Promise<void> {
    // Gera o hash do token
    const hashedRefreshToken = await hash(refreshToken, 10);

    // Atualiza o usuário no banco com o novo hash
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken: hashedRefreshToken,
    });
  }

  /**
   * Busca um usuário e verifica se o refresh token fornecido corresponde ao hash salvo.
   * Usado pela JwtRefreshStrategy para validar o token.
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    // Garante que o usuário e o hash existem
    if (!user || !user.currentHashedRefreshToken) {
      return null;
    }

    // Compara o token recebido com o hash salvo no banco
    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
  
  /**
   * Remove o refresh token de um usuário.
   * Chamado durante o logout.
   */
  async removeRefreshToken(userId: string): Promise<any> {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: undefined,
    });
  }
}
