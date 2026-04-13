import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProtocolsModule } from './protocols/protocols.module';
import { DocumentsModule } from './documents/documents.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProtocolsModule,
    DocumentsModule,
    WorkflowsModule,
    HealthModule,
  ],
})
export class AppModule {}
