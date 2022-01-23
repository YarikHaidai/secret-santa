import {Test, TestingModule} from '@nestjs/testing';
import {ShuffleService} from "./shuffle.service";

class ApiServiceMock {
    shuffle() {
        return [];
    }
    rand() {
        return [];
    }
    _checkRules() {
        return [];
    }
}

describe.only("ShuffleService", () => {
    let shuffleService: ShuffleService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: ShuffleService,
            useClass: ApiServiceMock,
        }
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShuffleService, ApiServiceProvider
            ],
        }).compile();
        shuffleService = module.get<ShuffleService>(ShuffleService);
    })

    it('should call shuffle method with expected params', async () => {
        const shuffleSpy = jest.spyOn(shuffleService, 'shuffle');
        await shuffleService.shuffle();
        expect(shuffleSpy).toHaveBeenCalled();
    });

    it('should call _checkRules method with expected params', async () => {
        const checkRulesSpy = jest.spyOn(shuffleService, '_checkRules');
        await shuffleService._checkRules();
        expect(checkRulesSpy).toHaveBeenCalled();
    });

    it('should call rand method with expected param', async () => {
        const randSpy = jest.spyOn(shuffleService, 'rand');
        const users = [];
        shuffleService.rand(users);
        expect(randSpy).toHaveBeenCalledWith(users);
    });
})