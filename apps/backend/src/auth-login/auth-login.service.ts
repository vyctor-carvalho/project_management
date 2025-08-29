import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!(user && (await compare(password, user.authLogin.password)))) {
      throw new NotFoundException('Email or password incorrect');
    }
    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.authLogin.email,
      name: user.name,
      role: user.userRole.name,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
      }),
    ]);
    await this.usersService.setCurrentRefreshToken(refresh_token, user.id);

    // Remove a senha e o refresh token hasheado do objeto de usuário
    // que será retornado para o frontend.
    const { authLogin, currentHashedRefreshToken, ...userToReturn } = user;
    const { password, ...safeAuthLogin } = authLogin;

    const responseUser = {
      ...userToReturn,
      authLogin: safeAuthLogin,
    };

    return {
      access_token,
      refresh_token,
      user: responseUser, // Inclui o objeto do usuário na resposta
    };
  }

  async refresh(user: User) {
    // A função de login já retorna o formato correto, então podemos reutilizá-la.
    return this.login(user);
  }

  async logout(userId: string) {
    return this.usersService.removeRefreshToken(userId);
  }
}