import {Module} from '@nestjs/common';
import {ShuffleController} from './shuffle.controller';
import {ShuffleService} from './shuffle.service';
import {UserService} from "../user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";
import {DesireEntity} from "../desire/desire.entity";

@Module({
    controllers: [ShuffleController],
    providers: [ShuffleService, UserService],
    imports: [TypeOrmModule.forFeature([UserEntity, DesireEntity])]
})
export class ShuffleModule {
}
