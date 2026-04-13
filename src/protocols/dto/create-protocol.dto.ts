import { IsOptional, IsString } from 'class-validator';

export class CreateProtocolDto {
  @IsString()
  applicantName!: string;

  @IsString()
  applicantCpf!: string;

  @IsString()
  serviceType!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
