import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import {UserModule} from "../src/user/user.module";
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserEntity} from "../src/user/user.entity";
import {DesireEntity} from "../src/desire/desire.entity";
import {UserService} from "../src/user/user.service";
import {ShuffleModule} from "../src/shuffle/shuffle.module";

describe('ShuffleController (e2e)', () => {
    let app: INestApplication;

    const mockShuffleDto = {
        status: true
    };

    const mockUserEntity = {
        id: 1,
        name: 'test',
        surname: 'test',
        desires: [{
            title: 'Desire title'
        }]
    };

    const mockUserService = {
        shuffle: jest.fn(),
        _checkRules: jest.fn(),
        rand: jest.fn(),
        count: jest.fn().mockResolvedValue(3)
    };

    const mockUserRepository = {
        count: jest.fn().mockResolvedValue(3),
        save: jest.fn().mockImplementation((user) =>
            Promise.resolve({id: Date.now(), ...user})
        ),
        find: jest.fn().mockResolvedValue([mockUserEntity])
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ShuffleModule]
        })
            .overrideProvider(getRepositoryToken(UserEntity))
            .useValue(mockUserRepository)
            .overrideProvider(getRepositoryToken(DesireEntity))
            .useValue(mockUserRepository)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('api/shuffle (POST)', () => {
        return request(app.getHttpServer())
            .post(`/api/shuffle`)
            .expect(HttpStatus.OK)
            .then((response) => {
                expect(response.body).toEqual(mockShuffleDto)
            })
    });
});
