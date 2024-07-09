import { IsString, IsEmail, Length, Matches, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'The name of the item',
    type: String,
    minLength: 6,
    maxLength: 12,
    example: 'ExampleName'
  })
  @IsString({ message: 'Name must be a string' })
  @Length(6, 12, { message: 'Name must be between 6 and 12 characters' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Name must contain only alphabets' })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'example@example.com'
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    minLength: 6,
    maxLength: 12,
    example: 'Password1'
  })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' })
  password: string;

  @ApiProperty({
    description: 'give a array',
    type: Array,
    example: '[7,8,9,10,22,34]'
  })
  @IsArray()
  arr: Number[];
}
