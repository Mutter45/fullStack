import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Header,
} from '@nestjs/common';
import type { Request, Response } from 'express';
export interface CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Body() body: CreateCatDto): string {
    console.log(body);
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request, @Res() res: Response) {
    console.log(request);
    res.status(HttpStatus.OK).json([
      {
        id: 1,
        name: 'Tom',
        age: 3,
        breed: 'Persian',
      },
      {
        id: 2,
        name: 'Kitty',
        age: 2,
        breed: 'Maine Coon',
      },
    ]);
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }
}
