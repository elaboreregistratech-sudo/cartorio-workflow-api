import { PrismaClient, UserRole, ProtocolStatus, WorkflowStepStatus, DocumentStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@cartorio.local' },
    update: {},
    create: {
      fullName: 'Vitória Novais',
      email: 'admin@cartorio.local',
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  const protocol = await prisma.protocol.upsert({
    where: { code: 'CRT-2026-0001' },
    update: {},
    create: {
      code: 'CRT-2026-0001',
      applicantName: 'Maria de Souza',
      applicantCpf: '123.456.789-00',
      serviceType: 'Registro de Imóvel',
      description: 'Protocolo inicial para análise documental do imóvel.',
      status: ProtocolStatus.IN_REVIEW,
      createdById: admin.id,
    },
  });

  await prisma.document.createMany({
    data: [
      {
        protocolId: protocol.id,
        name: 'RG do requerente',
        type: 'IDENTIFICATION',
        status: DocumentStatus.VALID,
      },
      {
        protocolId: protocol.id,
        name: 'Comprovante de endereço',
        type: 'ADDRESS_PROOF',
        status: DocumentStatus.PENDING,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.workflow.createMany({
    data: [
      {
        protocolId: protocol.id,
        title: 'Conferência documental',
        description: 'Verificar documentos básicos enviados no protocolo.',
        order: 1,
        status: WorkflowStepStatus.DONE,
        assignedToId: admin.id,
      },
      {
        protocolId: protocol.id,
        title: 'Validação cadastral',
        description: 'Validar dados do requerente e do imóvel.',
        order: 2,
        status: WorkflowStepStatus.IN_PROGRESS,
        assignedToId: admin.id,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
