import { IsNotEmpty, IsString, IsInt, Min, IsEmail } from 'class-validator';


export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsInt()
  @Min(1)
  about: string;
}
