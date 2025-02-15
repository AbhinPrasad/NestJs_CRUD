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

The @Global() decorator makes the module global-scoped. Global modules should be registered
only once, generally by the root or core module.
Modules that wish to inject the service will not need to import the CommonModule in 
their imports array.

Making everything global is not recommended as a design practice. While global modules 
can help reduce boilerplate, it's generally better to use the imports array to make 
a module's API available to other modules in a controlled and clear way. 
This approach provides better structure and maintainability, ensuring that only 
the necessary parts of the module are shared with others while avoiding unnecessary 
coupling between unrelated parts of the application.

*/
