import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateExpertiseAreaDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    name: string;
}
