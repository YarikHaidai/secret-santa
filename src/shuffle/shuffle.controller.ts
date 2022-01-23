import {Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ShuffleService} from "./shuffle.service";
import {ShuffleDto} from "./dto";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ApiBadRequestResponse} from "@nestjs/swagger/dist/decorators/api-response.decorator";

@ApiTags('Shuffle')
@Controller('api/shuffle')
export class ShuffleController {
    constructor(private readonly shuffleService: ShuffleService) {}

    @Post()
    @ApiOperation({description: 'Identify the pair of santa recipients'})
    @ApiOkResponse({type: ShuffleDto})
    @HttpCode(HttpStatus.OK)
    @ApiBadRequestResponse({description: 'Inconsistent rules of the game!'})
    async index(): Promise<ShuffleDto> {
        await this.shuffleService.shuffle();

        return {status: true}
    }
}
