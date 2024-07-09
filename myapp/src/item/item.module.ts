// src/item/item.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './item.service';
import { ItemsController } from './item.controller';
import { Item, ItemSchema } from './item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]  // <-- Ensure ItemService is exported
})
export class ItemsModule {}
