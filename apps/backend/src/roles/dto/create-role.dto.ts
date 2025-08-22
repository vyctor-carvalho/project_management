import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoleDto {
    @IsString({})
    @IsNotEmpty()
    @Length(3, 50)
    name: string;
}
