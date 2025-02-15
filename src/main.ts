import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FunctionalLogger } from './middlewares/functional.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(FunctionalLogger); // --->  bind middleware to every registered route at once
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
