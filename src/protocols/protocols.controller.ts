import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { UpdateProtocolStatusDto } from './dto/update-protocol-status.dto';
import { ProtocolsService } from './protocols.service';

@Controller('protocols')
@UseGuards(JwtAuthGuard)
export class ProtocolsController {
  constructor(private readonly protocolsService: ProtocolsService) {}

  @Post()
  create(
    @Body() dto: CreateProtocolDto,
    @CurrentUser() user: { userId: string },
  ) {
    return this.protocolsService.create(dto, user.userId);
  }

  @Get()
  findAll() {
    return this.protocolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.protocolsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateProtocolStatusDto) {
    return this.protocolsService.updateStatus(id, dto.status);
  }
}
