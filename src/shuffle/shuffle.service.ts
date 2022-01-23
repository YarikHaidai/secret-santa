import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ConfigService} from "../config/config.service";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class ShuffleService {
    constructor(
        private readonly userService: UserService
    ) {}

    async shuffle() {
        await this._checkRules();
        const users = this.rand(await this.userService.findAll());
        const userIds = users.map(user => user.id);
        const distributed = [];

        users.map((user: UserEntity) => {
            let filterArray = [];
            filterArray.push(user.id, ...distributed);

            let filtered = userIds.filter((item) => {
                return filterArray.indexOf(item) < 0;
            });
            let randomId = filtered[Math.floor(Math.random() * filtered.length)];
            distributed.push(randomId);

            user.recipient_id = randomId;
            this.userService.update(user);
        });
    }

    rand(array) {
        let copy = [];
        let length = array.length;
        let index;

        while (length) {
            index = Math.floor(Math.random() * length--);
            copy.push(array.splice(index, 1)[0]);
        }
        return copy;
    }

    async _checkRules() {
        const usersCount = await this.userService.count();
        const countUnallocated = await this.userService.getCountUnallocated();
        const minCount = ConfigService.minCountUser()
        const maxCount = ConfigService.maxCountUser()

        if (usersCount < minCount) {
            throw new BadRequestException('The number of users is not enough!');
        }

        if (usersCount > maxCount) {
            throw new BadRequestException('The number of users exceeds the limit!');
        }

        if (countUnallocated !== usersCount) {
            throw new BadRequestException('Pairs already assigned!');
        }
    }
}
