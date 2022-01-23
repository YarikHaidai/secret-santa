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
import {ApiProperty} from "@nestjs/swagger";

export class UserStoreDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({
    type: [DesireStoreDto],
    minItems: 1,
    maxItems: 10
  })
  @IsArray()
  @ValidateNested({each: true})
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Type(() => DesireStoreDto)
  desires: DesireStoreDto[]
}
