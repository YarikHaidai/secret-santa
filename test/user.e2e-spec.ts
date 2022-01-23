import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {UserModule} from "../src/user/user.module";
import {UserService} from "../src/user/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../src/user/user.entity";
import {DesireEntity} from "../src/desire/desire.entity";
import {UserController} from "../src/user/user.controller";
import {DesireModule} from "../src/desire/desire.module";

describe('UserController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
            imports: [TypeOrmModule.forFeature([UserEntity, DesireEntity])]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/api/users (POST)', () => {
        return request(app.getHttpServer())
            .post('/api/users')
            .expect(201)
            .expect('Hello World!');
    });
});
