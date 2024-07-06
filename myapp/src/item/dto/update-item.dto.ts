import { IsString, IsInt, Min, IsOptional, IsEmail, IS_BYTE_LENGTH } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

}
