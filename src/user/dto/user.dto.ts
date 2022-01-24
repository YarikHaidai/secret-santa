import {
  IsArray,
  IsInt,
  IsString,
  Min
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsArray()
  desires: string[]
}
