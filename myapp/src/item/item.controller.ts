// items.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ValidationPipe, UsePipes, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ItemsService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ProgramDto } from './dto/program.dto';
import { Item } from './item.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('items')
@ApiBearerAuth()
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Return all items.' })
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the item' })
  @ApiResponse({ status: 200, description: 'Return the item.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  async findOne(@Param('id') id: string): Promise<Item> {
    const item = await this.itemsService.findOne(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => new BadRequestException(
      errors.map(error => Object.values(error.constraints).join(', '))
    ),
  }))
  @ApiOperation({ summary: 'Create a new item' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 201, description: 'Item created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => new BadRequestException(
      errors.map(error => Object.values(error.constraints).join(', '))
    ),
  }))
  @ApiOperation({ summary: 'Update an item' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the item' })
  @ApiBody({ type: UpdateItemDto })
  @ApiResponse({ status: 200, description: 'Item updated successfully.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the item' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  async delete(@Param('id') id: string): Promise<Item> {
    const item = await this.itemsService.delete(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }


  @Post('program')
  async program(@Body() programDto: ProgramDto): Promise<number[][]> {
    return this.itemsService.program(programDto.arr);
  }  
}


