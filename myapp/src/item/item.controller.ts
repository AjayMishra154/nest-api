import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { ItemsService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.schema';
import { AuthGuard } from '@nestjs/passport';
import { minmax } from "./dto/validate-name.decorator";
import { NotFoundException,BadRequestException } from "./Exception/exception";


@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<Item> {
    const item = await this.itemsService.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    try {
      return await this.itemsService.create(createItemDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    try {
      const item = await this.itemsService.update(id, updateItemDto);
      if (!item) {
        throw new NotFoundException();
      }
      return item;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string): Promise<Item> {
    const item = await this.itemsService.delete(id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }
}
