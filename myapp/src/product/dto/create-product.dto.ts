// src/product/dto/create-product.dto.ts

import { IsString, IsNumber, Length, Matches, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    type: String,
    minLength: 6,
    maxLength: 12,
    example: 'ExampleProduct'
  })
  @IsString({ message: 'Name must be a string' })
  @Length(6, 12, { message: 'Name must be between 6 and 12 characters' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Name must contain only alphabets' })
  readonly name: string;

  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    example: 100
  })
  @IsNumber({}, { message: 'Price must be a number' })
  readonly price: number;

  @ApiProperty({
    description: 'The description of the product',
    type: String,
  })
  @IsString()
  @Length(10, 50, { message: 'Description must be between 10 and 50 characters' })
  readonly description: string;

  @ApiProperty({
    description: 'The ID of the associated item',
    type: String,
    example: '60d9f8f8f8f8f8f8f8f8f8f8'
  })
  @IsMongoId({ message: 'Item ID must be a valid Mongo ID' })
  readonly itemId: string;
}
