import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';

@Global()
@Module({
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}

/*

When you want to provide a set of providers which should be available everywhere out-of-the-box 
(e.g., helpers, database connections, etc.), make the module global with the @Global() decorator.

*/
