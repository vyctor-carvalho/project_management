import { IsNotEmpty, IsUUID } from "class-validator";


export class CreateUserExpertiseAreaDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    expertiseAreaId: string;
}
