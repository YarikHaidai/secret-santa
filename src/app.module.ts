import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DesireModule} from './desire/desire.module';
import {ConfigService} from "./config/config.service";
import {ShuffleModule} from "./shuffle/shuffle.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(ConfigService.getOrmConfig() as any),
        UserModule,
        DesireModule,
        ShuffleModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
