import {
  Controller,
  HttpStatus,
  Req,
  Res,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import * as fs from 'node:fs/promises';
import path = require('path');
import type { Request, Response } from 'express';

export interface TodoData {
  id: number;
  content: string;
  complete: boolean;
}

@Controller('todos')
export class TodosController {
  @Get()
  async findAll(@Req() request: Request, @Res() res: Response) {
    const listJson = await fs.readFile(
      path.join(__dirname, '../src/assets/data.json'),
      'utf-8',
    );
    const list = JSON.parse(listJson) as TodoData[];
    res.status(HttpStatus.OK).json(list);
  }
  @Post()
  async addData(@Body('content') content: string, @Res() res: Response) {
    try {
      const listJson = await fs.readFile(
        path.join(__dirname, '../src/assets/data.json'),
        'utf-8',
      );
      const list = JSON.parse(listJson) as TodoData[];
      const item = {
        id: Date.now(),
        content: content,
        complete: false,
      };
      list.push(item);
      await fs.writeFile(
        path.join(__dirname, '../src/assets/data.json'),
        JSON.stringify(list),
        'utf-8',
      );
      res.status(HttpStatus.OK).json(item);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send('添加失败');
    }
  }
}
