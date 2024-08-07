import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './controller/cats.controller';
import { TodosController } from './controller/todos.controller';
import { UploadModule } from './upload/upload.module';
import { AppService } from './app.service';

@Module({
  imports: [UploadModule],
  controllers: [AppController, CatsController, TodosController],
  providers: [AppService],
})
export class AppModule {}
