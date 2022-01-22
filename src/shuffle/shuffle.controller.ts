import {Controller, Get} from '@nestjs/common';
import {ShuffleService} from "./shuffle.service";

@Controller('api/shuffle')
export class ShuffleController {
    constructor(private readonly shuffleService: ShuffleService) {}

    @Get()
    async index() {
        await this.shuffleService.shuffle();
    }
}
