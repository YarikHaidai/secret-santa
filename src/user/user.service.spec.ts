import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {UserStoreDto} from "./dto";

class ApiServiceMock {
    create(dto: UserStoreDto) {
        return [];
    }

    findById(id: string) {
        return [];
    }

    update(user: UserEntity) {
        return [];
    }
}

describe.only("UserService", () => {

    let userService: UserService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: UserService,
            useClass: ApiServiceMock,
        }
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService, ApiServiceProvider
            ],
        }).compile();
        userService = module.get<UserService>(UserService);
    })

    it('should call create method with expected params', async () => {
        const createUserSpy = jest.spyOn(userService, 'create');
        const dto = new UserStoreDto();
        await userService.create(dto);
        expect(createUserSpy).toHaveBeenCalledWith(dto);
    });

    it('should call findById method with expected param', async () => {
        const findByIdUserSpy = jest.spyOn(userService, 'findById');
        const userId = 'userId';
        await userService.findById(userId);
        expect(findByIdUserSpy).toHaveBeenCalledWith(userId);
    });

    it('should call update method with expected params', async () => {
        const updateUserSpy = jest.spyOn(userService, 'update');
        const user = new UserEntity();
        await userService.update(user);
        expect(updateUserSpy).toHaveBeenCalledWith(user);
    });
})