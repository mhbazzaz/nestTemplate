import { Transform, TransformFnParams } from '@nestjs/class-transformer';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  Matches,
} from '@nestjs/class-validator';

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;

  @Matches(/^09[0-9]{9}$/)
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

}
