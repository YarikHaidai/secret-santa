import {IsNotEmpty, IsString} from "class-validator";

export class DesireStoreDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
