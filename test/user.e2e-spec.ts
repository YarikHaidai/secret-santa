import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import {UserModule} from "../src/user/user.module";
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserEntity} from "../src/user/user.entity";
import {DesireEntity} from "../src/desire/desire.entity";
import {UserService} from "../src/user/user.service";

describe('UserController (e2e)', () => {
    let app: INestApplication;

    const mockStoreUser = {
        id: 1,
        name: 'test',
        surname: 'test',
        desires: [{
            title: 'Desire title'
        }]
    };

    const mockUserDto = {
        id: 1,
        name: 'test',
        surname: 'test',
        desires: ['Desire title']
    };

    const mockRecipientDto = {
        name: 'test',
        surname: 'test',
        desires: ['Desire title']
    };

    const mockUserRepository = {
        count: jest.fn().mockResolvedValue(1),
        save: jest.fn().mockImplementation((user) =>
            Promise.resolve({id: Date.now(), ...user})
        ),
        findOne: jest.fn().mockResolvedValue(mockStoreUser)
    };

    const mockUserService = {
        create: jest.fn().mockResolvedValue(mockUserDto),
        getCountUnallocated: jest.fn().mockResolvedValue(1),
        findRecipient: jest.fn().mockResolvedValue(mockRecipientDto)
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule]
        })
            .overrideProvider(getRepositoryToken(UserEntity))
            .useValue(mockUserRepository)
            .overrideProvider(getRepositoryToken(DesireEntity))
            .useValue(mockUserRepository)
            .overrideProvider(UserService)
            .useValue(mockUserService)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/api/users (POST)', () => {
        return request(app.getHttpServer())
            .post(`/api/users`)
            .send(mockStoreUser)
            .expect(HttpStatus.CREATED)
            .then((response) => {
                expect(response.body).toEqual(mockUserDto)
            })
    });

    it('/api/users/:id (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/users/1')
            .expect(HttpStatus.OK)
            .then((response) => {
                expect(response.body).toEqual(mockRecipientDto)
            })
    });
});
