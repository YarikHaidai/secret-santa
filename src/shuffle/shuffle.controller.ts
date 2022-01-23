import {Controller, Get} from '@nestjs/common';
import {ShuffleService} from "./shuffle.service";
import {ShuffleDto} from "./dto";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Shuffle')
@Controller('api/shuffle')
export class ShuffleController {
    constructor(private readonly shuffleService: ShuffleService) {}

    @Get()
    @ApiOkResponse({type: ShuffleDto})
    async index(): Promise<ShuffleDto> {
        await this.shuffleService.shuffle();

        return {status: true}
    }
}
