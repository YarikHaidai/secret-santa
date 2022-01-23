import {Controller, Post} from '@nestjs/common';
import {ShuffleService} from "./shuffle.service";
import {ShuffleDto} from "./dto";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ApiBadRequestResponse} from "@nestjs/swagger/dist/decorators/api-response.decorator";

@ApiTags('Shuffle')
@Controller('api/shuffle')
export class ShuffleController {
    constructor(private readonly shuffleService: ShuffleService) {}

    @Post()
    @ApiOkResponse({type: ShuffleDto})
    @ApiBadRequestResponse({description: 'Inconsistent rules of the game!'})
    async index(): Promise<ShuffleDto> {
        await this.shuffleService.shuffle();

        return {status: true}
    }
}
