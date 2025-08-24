import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { TaskStatus } from "../enums/tasks-status.enum";
import { TaskPriority } from "../enums/task-priority.enum";


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status: TaskStatus;

    @IsEnum(TaskPriority)
    @IsOptional()
    priority: TaskPriority;

    @IsDateString()
    @IsOptional()
    dueDate: Date;

    @IsUUID()
    @IsNotEmpty()
    projectId: string;

    @IsUUID()
    @IsOptional()
    assigneeId: string;

    @IsUUID()
    @IsNotEmpty()
    areaId: string;
}
