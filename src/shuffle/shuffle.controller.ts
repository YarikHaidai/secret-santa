import {Controller, Get} from '@nestjs/common';
import {ShuffleService} from "./shuffle.service";
import {ShuffleDto} from "./dto";

@Controller('api/shuffle')
export class ShuffleController {
    constructor(private readonly shuffleService: ShuffleService) {}

    @Get()
    async index(): Promise<ShuffleDto> {
        await this.shuffleService.shuffle();

        return {status: true}
    }
}
