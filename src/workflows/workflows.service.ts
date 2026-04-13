import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkflowStepStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWorkflowDto) {
    const protocol = await this.prisma.protocol.findUnique({
      where: { id: dto.protocolId },
    });

    if (!protocol) {
      throw new NotFoundException('Protocolo não encontrado para vincular etapa.');
    }

    return this.prisma.workflow.create({
      data: {
        protocolId: dto.protocolId,
        title: dto.title,
        description: dto.description,
        order: dto.order,
        assignedToId: dto.assignedToId,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
      include: {
        assignedTo: { select: { id: true, fullName: true, email: true } },
      },
    });
  }

  async findByProtocol(protocolId: string) {
    return this.prisma.workflow.findMany({
      where: { protocolId },
      include: {
        assignedTo: { select: { id: true, fullName: true, email: true } },
      },
      orderBy: { order: 'asc' },
    });
  }

  async updateStatus(id: string, status: WorkflowStepStatus) {
    const workflow = await this.prisma.workflow.findUnique({ where: { id } });
    if (!workflow) {
      throw new NotFoundException('Etapa não encontrada.');
    }

    return this.prisma.workflow.update({
      where: { id },
      data: { status },
      include: {
        assignedTo: { select: { id: true, fullName: true, email: true } },
      },
    });
  }
}
