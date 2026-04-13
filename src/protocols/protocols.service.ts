import { Injectable, NotFoundException } from '@nestjs/common';
import { ProtocolStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateProtocolDto } from './dto/create-protocol.dto';

@Injectable()
export class ProtocolsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProtocolDto, createdById: string) {
    const year = new Date().getFullYear();
    const total = await this.prisma.protocol.count();
    const sequence = String(total + 1).padStart(4, '0');
    const code = `CRT-${year}-${sequence}`;

    return this.prisma.protocol.create({
      data: {
        code,
        applicantName: dto.applicantName,
        applicantCpf: dto.applicantCpf,
        serviceType: dto.serviceType,
        description: dto.description,
        createdById,
      },
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.protocol.findMany({
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } },
        documents: true,
        workflows: {
          include: {
            assignedTo: { select: { id: true, fullName: true, email: true } },
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const protocol = await this.prisma.protocol.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, fullName: true, email: true } },
        documents: true,
        workflows: {
          include: {
            assignedTo: { select: { id: true, fullName: true, email: true } },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!protocol) {
      throw new NotFoundException('Protocolo não encontrado.');
    }

    return protocol;
  }

  async updateStatus(id: string, status: ProtocolStatus) {
    await this.ensureExists(id);

    return this.prisma.protocol.update({
      where: { id },
      data: { status },
    });
  }

  private async ensureExists(id: string) {
    const protocol = await this.prisma.protocol.findUnique({ where: { id } });
    if (!protocol) {
      throw new NotFoundException('Protocolo não encontrado.');
    }
    return protocol;
  }
}
