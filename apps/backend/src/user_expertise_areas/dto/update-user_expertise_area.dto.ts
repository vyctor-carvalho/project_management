import { PartialType } from '@nestjs/mapped-types';
import { CreateUserExpertiseAreaDto } from './create-user_expertise_area.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateUserExpertiseAreaDto extends PartialType(CreateUserExpertiseAreaDto) {
    @IsOptional()
    @IsUUID()
    userId: string;

    @IsOptional()
    @IsUUID()
    expertiseAreaId: string;
}
