import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './core/config/configuration';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = configuration();

  const swaggerConfig = new DocumentBuilder().setTitle('Softline Test Task. Maksym Voitenko').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}
bootstrap();
