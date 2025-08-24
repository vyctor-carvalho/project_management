import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthLoginDto } from './dto/create-auth-login.dto';
import { UpdateAuthLoginDto } from './dto/update-auth-login.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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
      role: user.userRole.name
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("JWT_SECRET"),
        expiresIn: this.configService.get<number>("JWT_EXPIRES_IN")
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("REFRESH_SECRET"),
        expiresIn: this.configService.get<number>("REFRSH_TOKEN_EXPIRES_IN")
      })
    ])
    await this.usersService.setCurrentRefreshToken(refresh_token, user.id);

    return {
      access_token: access_token,
      refresh_token: refresh_token
    }
  }

  async refresh(user: User) {
    return this.login(user);
  }

  async logout(userId: string) {
    return this.usersService.removeRefreshToken(userId);
  }


}
