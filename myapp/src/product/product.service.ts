// src/product/product.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from "./dto/update-product.dto";
import { ItemsService } from '../item/item.service'; // Ensure this import is correct

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly itemsService: ItemsService // Ensure this is correctly named
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const item = await this.itemsService.findOne(createProductDto.itemId);
    if (!item) {
      throw new NotFoundException(`Item with ID ${createProductDto.itemId} not found`);
    }

    const newProduct = new this.productModel({
      ...createProductDto,
      item: item.email // Associate the product with the item's email
    });

    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    }).exec();

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async delete(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
