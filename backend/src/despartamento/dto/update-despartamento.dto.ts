import { PartialType } from '@nestjs/mapped-types';
import { CreateDespartamentoDto } from './create-despartamento.dto';

export class UpdateDespartamentoDto extends PartialType(CreateDespartamentoDto) {}
