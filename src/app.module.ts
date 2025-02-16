import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CommonController } from './common/common.controller';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CatchEverythingFilter } from './common/catch-everything.filter';
import { ValidationPipe } from './pipes/validation.pipe';

@Module({
  imports: [UsersModule, CommonModule],
  controllers: [AppController, UsersController, CommonController],
  providers: [
    { provide: APP_FILTER, useClass: CatchEverythingFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
    AppService,
    UsersService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // .exclude({ path: 'users', method: RequestMethod.PATCH })
    // .forRoutes('users'); --> for users route handler
    // .forRoutes({ path: 'users', method: RequestMethod.GET }); --> for particular request method
    // .forRoutes(UsersController); --> for a single controller
  }
}

/*

The configure() method can be made asynchronous using async/await 
(e.g., you can await completion of an asynchronous operation inside the configure() method body).

The apply() method may either take a single middleware, or multiple arguments 
to specify multiple middlewares.

Accessing the DI container in a global middleware is not possible.
You can use a functional middleware instead when using app.use(). 
Alternatively, you can use a class middleware and consume it with .forRoutes('*') 
within the AppModule (or any other module).

When using this approach(APP_FILTER) to perform dependency injection for the filter,
note that regardless of the module where this construction is employed, 
the filter is, in fact, global. 
Where should this be done? Choose the module where the filter 
(HttpExceptionFilter in the example above) is defined. 
Also, useClass is not the only way of dealing with custom provider registration.
*/
