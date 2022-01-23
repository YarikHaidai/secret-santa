import {
  IsArray,
  IsString
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RecipientDto {
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
