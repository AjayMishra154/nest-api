import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProgramDto {
  @ApiProperty({
    description: 'An array of numbers',
    type: [Number],
    example: [4, 2, 9, 5, 1]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  arr: number[];
}
