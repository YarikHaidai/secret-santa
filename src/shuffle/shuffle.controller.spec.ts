import {Test, TestingModule} from '@nestjs/testing';
import {ShuffleController} from "./shuffle.controller";
import {ShuffleService} from "./shuffle.service";

describe("ShuffleController Unit Tests", () => {
    let shuffleController: ShuffleController;
    let spyService: ShuffleService
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: ShuffleService,
            useFactory: () => ({
                store: jest.fn(() => {}),
                create: jest.fn(() => {}),
                findRecipient: jest.fn(() => {}),
                _checkRules: jest.fn(() => {}),
                rand: jest.fn(() => {}),
                shuffle: jest.fn(() => {})
            })
        }
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ShuffleController],
            providers: [ShuffleService, ApiServiceProvider],
        }).compile();

        shuffleController = app.get<ShuffleController>(ShuffleController);
        spyService = app.get<ShuffleService>(ShuffleService);
    })

    it("calling controller index method", () => {
        expect(shuffleController.index()).not.toEqual(null);
    })

    it("calling controller index method", () => {
        shuffleController.index();
        expect(spyService.shuffle).toHaveBeenCalled();
    })
});