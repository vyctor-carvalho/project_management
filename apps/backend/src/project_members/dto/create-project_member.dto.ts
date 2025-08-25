import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


export class CreateProjectMemberDto {
    @IsOptional()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsUUID()
    projectId: string;

    @IsNotEmpty()
    @IsUUID()
    memberId: string;
}
