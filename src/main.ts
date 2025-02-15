import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FunctionalLogger } from './middlewares/functional.middleware';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(FunctionalLogger); // --->  bind middleware to every registered route at once
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/*
The useGlobalFilters() method does not set up filters for gateways or hybrid applications.
*/
