import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
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
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'users', method: RequestMethod.PATCH })
      // .forRoutes('users'); --> for users route handler
      // .forRoutes({ path: 'users', method: RequestMethod.GET }); --> for particular request method
      .forRoutes(UsersController); //--> for a single controller
  }
}

/*

The configure() method can be made asynchronous using async/await 
(e.g., you can await completion of an asynchronous operation inside the configure() method body).

The apply() method may either take a single middleware, or multiple arguments 
to specify multiple middlewares.

*/
