// src/dto/graph.dto.ts
import { IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GrafoDTO {
  @IsObject()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Object) 
  grafo: Record<string, Record<string, number>>; 

  @IsString()
  @ApiProperty()
  nodoInicial: string;
  @IsString()
  @ApiProperty()
  nodoFin: string;
}
