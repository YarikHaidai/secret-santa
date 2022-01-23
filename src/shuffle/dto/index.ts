import {IsBoolean} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ShuffleDto {
    @ApiProperty()
    @IsBoolean()
    status: boolean;
}
