import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto, UserStoreDto} from "./dto";

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    show(@Param('id') id: string): Promise<UserDto> {
        return this.userService.findRecipient(id);
    }

    @Post()
    store(@Body() storeDto: UserStoreDto): Promise<UserDto> {
        return this.userService.create(storeDto);
    }
}
