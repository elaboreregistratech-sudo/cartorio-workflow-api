import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDocumentDto) {
    const protocol = await this.prisma.protocol.findUnique({
      where: { id: dto.protocolId },
    });

    if (!protocol) {
      throw new NotFoundException('Protocolo não encontrado para vincular documento.');
    }

    return this.prisma.document.create({
      data: {
        protocolId: dto.protocolId,
        name: dto.name,
        type: dto.type,
        fileUrl: dto.fileUrl,
        notes: dto.notes,
      },
    });
  }

  async findByProtocol(protocolId: string) {
    return this.prisma.document.findMany({
      where: { protocolId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: DocumentStatus) {
    const document = await this.prisma.document.findUnique({ where: { id } });
    if (!document) {
      throw new NotFoundException('Documento não encontrado.');
    }

    return this.prisma.document.update({
      where: { id },
      data: { status },
    });
  }
}
