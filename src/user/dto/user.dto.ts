import {
  IsArray,
  IsNumber,
  IsString
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../user.entity";

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

  @IsNumber()
  recipient: UserEntity;

  @ApiProperty()
  @IsArray()
  desires: string[]
}
