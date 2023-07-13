import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DespartamentoService } from './despartamento.service';
import { CreateDespartamentoDto } from './dto/create-despartamento.dto';
import { UpdateDespartamentoDto } from './dto/update-despartamento.dto';

@Controller('despartamento')
export class DespartamentoController {
  constructor(private readonly despartamentoService: DespartamentoService) {}

  @Post()
  create(@Body() createDespartamentoDto: CreateDespartamentoDto) {
    return this.despartamentoService.create(createDespartamentoDto);
  }

  @Get()
  findAll() {
    return this.despartamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.despartamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDespartamentoDto: UpdateDespartamentoDto) {
    return this.despartamentoService.update(+id, updateDespartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.despartamentoService.remove(+id);
  }
}
