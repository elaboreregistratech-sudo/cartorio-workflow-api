import { IsEnum } from 'class-validator';
import { ProtocolStatus } from '@prisma/client';

export class UpdateProtocolStatusDto {
  @IsEnum(ProtocolStatus)
  status!: ProtocolStatus;
}
