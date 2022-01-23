import {
  IsArray,
  IsNumber,
  IsString
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsNumber()
  recipient_id: number;

  @ApiProperty()
  @IsArray()
  desires: string[]
}
