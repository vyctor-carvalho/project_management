import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { EmploymentType } from '../enums/employment-type.enum';
import { UpdateAuthLoginDto } from 'src/auth-login/dto/update-auth-login.dto';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateAuthLoginDto)
    authLogin: UpdateAuthLoginDto;

    @IsOptional()
    @IsEnum(EmploymentType)
    employmentType: EmploymentType;

    @Type(() => Date)
    @IsOptional()
    @IsDate()
    BrithDate: Date;   

    @IsOptional()
    @IsUUID()
    roleId: string
}
