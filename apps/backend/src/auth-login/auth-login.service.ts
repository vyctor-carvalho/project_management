import { Injectable } from '@nestjs/common';
import { CreateAuthLoginDto } from './dto/create-auth-login.dto';
import { UpdateAuthLoginDto } from './dto/update-auth-login.dto';

@Injectable()
export class AuthLoginService {
  create(createAuthLoginDto: CreateAuthLoginDto) {
    return 'This action adds a new authLogin';
  }

  findAll() {
    return `This action returns all authLogin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authLogin`;
  }

  update(id: number, updateAuthLoginDto: UpdateAuthLoginDto) {
    return `This action updates a #${id} authLogin`;
  }

  remove(id: number) {
    return `This action removes a #${id} authLogin`;
  }
}
