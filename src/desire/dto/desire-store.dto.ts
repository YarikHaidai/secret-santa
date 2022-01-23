import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DesireStoreDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
