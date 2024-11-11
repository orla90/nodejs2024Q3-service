import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { promises } from 'fs';
import { cwd } from 'process';
import * as yaml from 'js-yaml';
import { config } from 'dotenv';

interface OpenAPIDocument {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  servers: Array<{ url: string }>;
  components: any;
  paths: any;
}

async function loadYaml(filePath: string): Promise<OpenAPIDocument> {
  try {
    const fileContents = await promises.readFile(filePath, 'utf8');
    return yaml.load(fileContents) as OpenAPIDocument;
  } catch (error) {
    console.error('Error reading or parsing YAML file:', error);
    throw error;
  }
}

async function bootstrap() {
  config();
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const apiDocument = await loadYaml(resolve(cwd(), 'doc', 'api.yaml'));
  apiDocument.servers = [
    {
      url: `http://localhost:${PORT}/api`,
    },
  ];
  const document = SwaggerModule.createDocument(app, apiDocument);
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}
bootstrap();
