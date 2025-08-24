import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAuthLoginDto } from 'src/auth-login/dto/create-auth-login.dto';
import { EmploymentType } from '../enums/employment-type.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateAuthLoginDto)
    authLogin: CreateAuthLoginDto;

    @IsNotEmpty()
    @IsEnum(EmploymentType)
    employmentType: EmploymentType;

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    BrithDate: Date;

    @IsNotEmpty()
    @IsUUID()
    roleId: string
}
