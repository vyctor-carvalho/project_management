import { IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Type } from 'class-transformer';

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2) 
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    technologies: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    deadline: Date;
}
