import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/*
The @Catch(HttpException) decorator binds the required metadata to the exception filter,
telling Nest that this particular filter is looking for exceptions of type HttpException 
and nothing else. The @Catch() decorator may take a single parameter, or a comma-separated list.
This lets you set up the filter for several types of exceptions at once.
*/
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
