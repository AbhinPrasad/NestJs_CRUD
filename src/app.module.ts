import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CommonController } from './common/common.controller';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UsersModule, CommonModule],
  controllers: [AppController, UsersController, CommonController],
  providers: [AppService, UsersService],
})
export class AppModule {}
