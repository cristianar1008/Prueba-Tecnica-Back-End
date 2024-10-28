import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GrafoDTO } from './dto/grafo.dto';


@Controller()
@ApiTags('Generar Itinerario')
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post('Dijkstra')
  @ApiOperation({ summary: 'Camino mas corto' })
  @ApiResponse({
    status: 201,
    description: 'Camino mas corto generado',
  })
  dijkstra(@Body() grafoDto: GrafoDTO) {
    const { grafo, nodoInicial, nodoFin } = grafoDto;
    return this.appService.dijkstra(grafo, nodoInicial, nodoFin);
  }
}
