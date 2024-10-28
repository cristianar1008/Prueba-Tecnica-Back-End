// src/graph.service.ts
import { Injectable } from '@nestjs/common';
import { GrafoDTO } from './dto/grafo.dto';

@Injectable()
export class AppService {
  dijkstra(grafo: Record<string, Record<string, number>>, nodoInicial: string, nodoFin: string): { camino: string[], distancia: number } {
    const distancias: Record<string, number> = {};
    const padres: Record<string, string | null> = {};
    const visto = new Set<string>();

    // Inicializar distancias
    for (const nodo in grafo) {
      distancias[nodo] = Infinity;
      padres[nodo] = null;
    }
    distancias[nodoInicial] = 0;

    // Dijkstra
    while (visto.size < Object.keys(grafo).length) {
      const nodoActual = Object.keys(distancias)
        .filter(nodo => !visto.has(nodo))
        .reduce((minNodo, nodo) => (distancias[nodo] < distancias[minNodo] ? nodo : minNodo));

      if (nodoActual === nodoFin) break; // Terminamos si alcanzamos el nodo final

      visto.add(nodoActual);

      for (const vecino in grafo[nodoActual]) {
        const distancia = distancias[nodoActual] + grafo[nodoActual][vecino];
        if (distancia < distancias[vecino]) {
          distancias[vecino] = distancia;
          padres[vecino] = nodoActual;
        }
      }
    }

    // Reconstruir el camino más corto
    const camino = [];
    let nodo = nodoFin;
    while (nodo) {
      camino.unshift(nodo);
      nodo = padres[nodo];
    }

    return { camino, distancia: distancias[nodoFin] };
  }
}
