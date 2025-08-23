import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsDate, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    technologies?: string;

    @IsDate()
    @IsOptional()
    deadline?: Date;
}
