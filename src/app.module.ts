import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CommonController } from './common/common.controller';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [UsersModule, CommonModule],
  controllers: [AppController, UsersController, CommonController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users'); // --> for users route handler
  }
}
