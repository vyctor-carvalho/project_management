import { PartialType } from '@nestjs/mapped-types';
import { CreateExpertiseAreaDto } from './create-expertise-area.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateExpertiseAreaDto extends PartialType(CreateExpertiseAreaDto) {
    @IsOptional() 
    @IsString()
    @Length(3, 50)
    name?: string;
}
