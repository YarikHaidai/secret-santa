import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {UserDto, UserStoreDto, RecipientDto} from "./dto";
import {DesireEntity} from "../desire/desire.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(DesireEntity)
        private readonly desireRepository: Repository<DesireEntity>
    ) {}

    async getCountUnallocated() {
        return this.userRepository.count({recipient_id: null});
    }

    async count(): Promise<number> {
        return this.userRepository.count();
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findRecipient(id: string): Promise<RecipientDto> {
        const user = await this.userRepository.findOne(id, {
            'relations': ['desires', 'recipient']
        });

        if (!user) {
            throw new BadRequestException('User not found!');
        }

        if (!user.recipient) {
            throw new BadRequestException('Pairs not yet determined!');
        }

        user.recipient.desires = await this.desireRepository.find({
            user_id: user.recipient_id
        });

        return this.buildRecipientDto(user);
    }

    async create(user: UserStoreDto): Promise<UserDto> {
        const usersCount = await this.userRepository.count();
        const countUnallocated = await this.getCountUnallocated();

        if (countUnallocated !== usersCount) {
            throw new BadRequestException('Pairs already assigned!');
        }

        const entity = Object.assign(new UserEntity(), user);
        const newUser = await this.userRepository.save(entity);

        return this.buildDto(newUser);
    }

    async update(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    buildDto = (user: UserEntity): UserDto => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        desires: user.desires.map(desire => desire.title)
    });

    buildRecipientDto = (recipient: UserEntity): RecipientDto => ({
        name: recipient.name,
        surname: recipient.surname,
        desires: recipient.desires.map(desire => desire.title)
    });
}
