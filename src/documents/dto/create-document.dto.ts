import { IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  protocolId!: string;

  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
