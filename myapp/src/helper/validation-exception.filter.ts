import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const validationErrors = exceptionResponse.message;

    const errors = validationErrors.map(error => ({
      message: error,
    }));

    response.status(status).json({
      title: 'Bad Request',
      status,
      detail: 'The request could not be processed due to semantic errors. Please check your input and try again.',
      errors,
    });
  }
}
