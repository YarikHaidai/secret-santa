import {
  IsArray,
  IsNumber,
  IsString
} from "class-validator";

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsNumber()
  recipient_id: number;

  @IsArray()
  desires: string[]
}
