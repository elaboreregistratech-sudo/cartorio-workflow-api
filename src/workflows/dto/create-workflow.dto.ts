import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  protocolId!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  order!: number;

  @IsOptional()
  @IsString()
  assignedToId?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
