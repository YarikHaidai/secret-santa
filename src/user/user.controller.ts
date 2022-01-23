import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto, UserStoreDto} from "./dto";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    @ApiOkResponse({type: UserDto})
    recipientInfo(@Param('id') id: string): Promise<UserDto> {
        return this.userService.findRecipient(id);
    }

    @Post()
    @ApiCreatedResponse({type: UserDto})
    store(@Body() storeDto: UserStoreDto): Promise<UserDto> {
        return this.userService.create(storeDto);
    }
}
