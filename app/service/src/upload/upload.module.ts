import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { join } from 'node:path';
@Module({
  imports: [MulterModule.register()],
  controllers: [UploadController],
})
export class UploadModule {}
