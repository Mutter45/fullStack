import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Request, Response } from 'express';
import { join } from 'node:path';
import { readdir, appendFileSync, unlinkSync, readFileSync } from 'node:fs';
@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'src/uploads/temp'), // 文件存储目录上传文件的存储目录
        filename: (req: Request, _file, callback) => {
          callback(null, `${req.body.index}-${req.body.fileName}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    res.status(HttpStatus.OK).json('上传成功');
  }

  @Post('merge')
  mergeFile(@Body('name') name: string, @Res() res: Response) {
    readdir(join(process.cwd(), 'src/uploads/temp'), (err, files) => {
      files.sort(
        (a, b) =>
          (a.split('-')[0] as unknown as number) -
          (b.split('-')[0] as unknown as number),
      );
      files.forEach((file) => {
        const data = readFileSync(
          join(process.cwd(), 'src/uploads/temp', file),
        );
        appendFileSync(join(process.cwd(), 'src/uploads', name), data);
        // 清空临时文件
        unlinkSync(join(process.cwd(), 'src/uploads/temp', file));
      });
    });
    res.status(HttpStatus.OK).json('合并成功');
  }

  @Get('check/:name')
  checkFile(@Param('name') name: string, @Res() res: Response) {
    readdir(join(process.cwd(), 'src/uploads/temp'), (err, files) => {
      if (err) throw err;
      const uploaded = files
        .filter((file) => file.split('-')[1] === name)
        .map((file) => file.split('-')[0]);
      res.status(HttpStatus.OK).json(uploaded);
    });
  }
}
