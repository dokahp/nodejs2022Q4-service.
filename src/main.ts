import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { path } from 'app-root-path';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const apiJson = JSON.parse(
    readFileSync(`${path}/doc/api.json`, { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, apiJson);
  await app.listen(process.env.PORT);
}
bootstrap();
