import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserStoreDto} from './dto';

describe("UserController Unit Tests", () => {
    let userController: UserController;
    let spyService: UserService
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: UserService,
            useFactory: () => ({
                store: jest.fn(() => {}),
                create: jest.fn(() => {}),
                findRecipient: jest.fn(() => {})
            })
        }
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, ApiServiceProvider],
        }).compile();

        userController = app.get<UserController>(UserController);
        spyService = app.get<UserService>(UserService);
    })

    it("calling controller store method", () => {
        const dto = new UserStoreDto();
        expect(userController.store(dto)).not.toEqual(null);
    })

    it("calling service store method", () => {
        const dto = new UserStoreDto();
        userController.store(dto);
        expect(spyService.create).toHaveBeenCalled();
        expect(spyService.create).toHaveBeenCalledWith(dto);
    })

    it("calling recipientInfo method", () => {
        const id = '3';
        userController.recipientInfo(id);
        expect(spyService.findRecipient).toHaveBeenCalled();
    })
});