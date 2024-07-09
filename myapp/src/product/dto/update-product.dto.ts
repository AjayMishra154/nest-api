// src/product/dto/update-product.dto.ts

import { IsString, IsNumber, Length, Matches, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'The name of the product',
    type: String,
    minLength: 6,
    maxLength: 12,
    example: 'ExampleProduct',
    required: false
  })
  @IsString({ message: 'Name must be a string' })
  @Length(6, 12, { message: 'Name must be between 6 and 12 characters' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Name must contain only alphabets' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    example: 100,
    required: false
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsOptional()
  readonly price?: number;

  @ApiProperty({
    description: 'The description of the product',
    type: String,
    required: false,
  })
  @IsString()
  @Length(10, 50, { message: 'Description must be between 10 and 50 characters' })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'The ID of the item',
    type: String,
    example: '60c72b2f9b1d8c2a4c8e8f8d',
    required: false
  })
  @IsMongoId({ message: 'Item ID must be a valid MongoDB ObjectId' })
  @IsOptional()
  readonly item?: string;
}
