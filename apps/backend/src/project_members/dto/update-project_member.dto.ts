import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectMemberDto } from './create-project_member.dto';
import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateProjectMemberDto extends PartialType(CreateProjectMemberDto) {
    @IsOptional()
    @IsString()
    role: string;

    @IsOptional()
    @IsUUID()
    projectId: string;

    @IsOptional()
    @IsUUID()
    memberId: string;
}
