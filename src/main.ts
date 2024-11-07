import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { promises } from 'fs';
import { cwd } from 'process';
import { parse } from 'yaml';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDocument = await promises.readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('doc', app, parse(apiDocument));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
