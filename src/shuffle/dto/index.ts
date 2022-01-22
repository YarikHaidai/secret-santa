import {IsBoolean} from "class-validator";

export class ShuffleDto {
    @IsBoolean()
    status: boolean;
}
