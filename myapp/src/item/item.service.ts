import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}
  public getItems(): string[] {
    return ['sword', 'axe', 'pants'];
  }
  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id).exec();
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const existingItem = await this.itemModel.findOne({ email: createItemDto.email }).exec();
    if (existingItem) {
      throw new Error('Email must be unique');
    }
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const existingItem = await this.itemModel.findOne({ email: updateItemDto.email }).exec();
    if (existingItem && existingItem._id.toString() !== id) {
      throw new Error('Email must be unique');
    }
    return this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Item> {
    return this.itemModel.findByIdAndDelete(id).exec();
  }

  async program(arr: number[]): Promise<number[][]> {
    const a: number[][] = [];
    for (let i = 0; i < arr.length; i++) {
      let count = 0;
      for (let j = 0; j < a.length; j++) {
        if (arr[i] > a[j][0]) {
          a[j].push(arr[i]);
          count += 1;
          break;
        }
      }
      if (count == 0) {
        a.push([arr[i]]);
      }
    }
    return a;
  }
}
