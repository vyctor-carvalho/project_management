import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { TaskStatus } from "../enums/tasks-status.enum";
import { TaskPriority } from "../enums/task-priority.enum";
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsOptional()
    @IsString()
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
    @IsOptional()
    projectId: string;

    @IsUUID()
    @IsOptional()
    assigneeId: string;

    @IsUUID()
    @IsOptional()
    areaId: string;
}
