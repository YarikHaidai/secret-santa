import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserStoreDto} from "./dto/user-store.dto";

@Controller('user')
export class UserController {

    @Get(':id')
    show(@Param('id') id: string): string {

        return "";
    }

    @Post()
    store(@Body() storeDto: UserStoreDto): string {
        console.log(storeDto);

        return "";
    }
}
