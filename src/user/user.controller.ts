import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto, UserStoreDto, RecipientDto} from "./dto";
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ApiBadRequestResponse, ApiNotFoundResponse} from "@nestjs/swagger/dist/decorators/api-response.decorator";

@ApiTags('Users')
@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    @ApiOperation({description: 'Get information about your recipient by your ID.'})
    @ApiOkResponse({type: RecipientDto})
    @ApiBadRequestResponse({description: 'Pairs not yet determined!'})
    @ApiNotFoundResponse({description: 'User not found!'})
    recipientInfo(@Param('id') id: string): Promise<RecipientDto> {
        return this.userService.findRecipient(id);
    }

    @Post()
    @ApiOperation({description: 'Creating a new member'})
    @ApiCreatedResponse({type: UserDto})
    @ApiBadRequestResponse({description: 'Pairs already assigned!'})
    store(@Body() storeDto: UserStoreDto): Promise<UserDto> {
        return this.userService.create(storeDto);
    }
}
