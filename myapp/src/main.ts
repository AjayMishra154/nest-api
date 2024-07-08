// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException, HttpStatus } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationExceptionFilter } from './helper/validation-exception.filter';
import { AllExceptionsFilter } from './helper/all-exception-filter';

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


  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Start the app
  await app.listen(3000);
}
bootstrap();
