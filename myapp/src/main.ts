import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException, HttpStatus } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationExceptionFilter } from './helper/validation-exception.filter';
import { AllExceptionsFilter } from './helper/all-exception-filter';
import { ItemsController } from './item/item.controller'; // Adjust the import path accordingly
import { ItemsModule } from './item/item.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(error => Object.values(error.constraints));
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          message: messages.join(', ')
        });
      }
    }),
  );

  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());


  const optionsAll = new DocumentBuilder()
    .setTitle('All Items API')
    .setDescription('API including all methods')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentAll = SwaggerModule.createDocument(app, optionsAll);
  SwaggerModule.setup('api-docs/all', app, documentAll);


  const optionsSpecific = new DocumentBuilder()
    .setTitle('Specific Items API')
    .setDescription('API including specific methods')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const documentSpecific = SwaggerModule.createDocument(app, optionsSpecific, {
    include: [ItemsModule],
  });

  
  const specificPaths = {
    '/items/{id}': ['get', 'post', 'put'],
    '/items': ['get', 'post']
  };

  
  const filteredPaths = Object.keys(specificPaths).reduce((acc, path) => {
    if (documentSpecific.paths[path]) {
      const methods = specificPaths[path];
      const filteredMethods = methods.reduce((methodAcc, method) => {
        if (documentSpecific.paths[path][method]) {
          methodAcc[method] = documentSpecific.paths[path][method];
        }
        return methodAcc;
      }, {} as Record<string, any>);

      if (Object.keys(filteredMethods).length > 0) {
        acc[path] = filteredMethods;
      }
    }
    return acc;
  }, {} as Record<string, Record<string, any>>);

  
  console.log('Filtered paths:', JSON.stringify(filteredPaths, null, 2));

  
  documentSpecific.paths = filteredPaths;

  SwaggerModule.setup('api-docs/specific', app, documentSpecific);

  await app.listen(3000);
}

bootstrap();
