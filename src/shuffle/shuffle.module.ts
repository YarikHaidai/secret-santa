import {Module} from '@nestjs/common';
import {ShuffleController} from './shuffle.controller';
import {ShuffleService} from './shuffle.service';
import {UserService} from "../user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";

@Module({
    controllers: [ShuffleController],
    providers: [ShuffleService, UserService],
    imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class ShuffleModule {
}
