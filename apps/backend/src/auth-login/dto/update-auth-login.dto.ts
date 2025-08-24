import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthLoginDto } from './create-auth-login.dto';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthLoginDto extends PartialType(CreateAuthLoginDto) {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;
}
