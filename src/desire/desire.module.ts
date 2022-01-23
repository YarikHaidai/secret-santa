import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DesireEntity} from "./desire.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DesireEntity])],
})
export class DesireModule {}
