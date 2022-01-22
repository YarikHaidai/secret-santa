import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested
} from "class-validator";

import {DesireStoreDto} from "../../desire/dto";
import {Type} from "class-transformer";

export class UserStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsArray()
  @ValidateNested({each: true})
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Type(() => DesireStoreDto)
  desires: DesireStoreDto[]
}
