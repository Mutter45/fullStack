import {
  Controller,
  HttpStatus,
  Res,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import operate from '../utils/operate';
import type { Response } from 'express';

export interface TodoData {
  id: number;
  content: string;
  complete: boolean;
}
import path = require('path');
@Controller('todos')
export class TodosController {
  private getPath() {
    return path.join(__dirname, '../src/assets/data.json');
  }
  @Get()
  public async findAll(@Res() res: Response) {
    const list = await operate<TodoData>(this.getPath());
    res.status(HttpStatus.OK).json(list);
  }

  @Post()
  public async addData(@Body('content') content: string, @Res() res: Response) {
    try {
      const item = {
        id: Date.now(),
        content: content,
        complete: false,
      };
      await operate<TodoData>(this.getPath(), (list) => {
        list.push(item);
        return list;
      });
      res.status(HttpStatus.OK).json(item);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send('添加失败');
    }
  }
  @Delete(':id')
  public async deleteData(@Param('id') id: string, @Res() res: Response) {
    try {
      await operate<TodoData>(this.getPath(), (list) =>
        list.filter((item) => item.id !== Number(id)),
      );
      res.status(HttpStatus.OK).json({ id });
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send('添加失败');
    }
  }
  @Put(':id')
  public async updateData(@Param('id') id: string, @Res() res: Response) {
    try {
      await operate<TodoData>(this.getPath(), (list) =>
        list.map((item) => {
          if (item.id === Number(id)) {
            item.complete = !item.complete;
          }
          return item;
        }),
      );
      res.status(HttpStatus.OK).json({ id });
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send('添加失败');
    }
  }
}
