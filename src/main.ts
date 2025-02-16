import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FunctionalLogger } from './middlewares/functional.middleware';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { RolesGuard } from './guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(FunctionalLogger); // --->  bind middleware to every registered route at once
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/*
The useGlobalFilters() method does not set up filters for gateways or hybrid applications.

Global-scoped filters are used across the whole application, for every controller and 
every route handler. In terms of dependency injection, global filters registered from 
outside of any module (with useGlobalFilters()) cannot inject dependencies since this 
is done outside the context of any module. In order to solve this issue, you can 
register a global-scoped filter directly from any module using APP_FILTER.
Refer app.module.ts

Global pipes are used across the whole application, for every controller and every route handler.
Note that in terms of dependency injection, global pipes registered from outside of any 
module (with useGlobalPipes() as in the example above) cannot inject dependencies since 
the binding has been done outside the context of any module. In order to solve this issue, 
you can set up a global pipe directly from any module using APP_PIPE.
Refer app.module.ts
*/
