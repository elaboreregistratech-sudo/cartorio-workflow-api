import { IsEnum } from 'class-validator';
import { WorkflowStepStatus } from '@prisma/client';

export class UpdateWorkflowStatusDto {
  @IsEnum(WorkflowStepStatus)
  status!: WorkflowStepStatus;
}
