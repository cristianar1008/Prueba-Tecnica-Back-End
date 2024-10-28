import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura Swagger
  const config = new DocumentBuilder()
  .setTitle('Itinerario de viaje')
  .setDescription('Servicio REST - Algoritmo de Dijkstra')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicación corriendo en: ${await app.getUrl()}`);
  console.log(`Documentación Swagger: ${await app.getUrl()}/api`);
}

bootstrap();
