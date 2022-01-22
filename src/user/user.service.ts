import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {UserDto, UserStoreDto} from "./dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    getCountUnallocated() {
        return this.userRepository.count({recipient_id: null});
    }

    async count(): Promise<number> {
        return this.userRepository.count();
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async create(user: UserStoreDto): Promise<UserDto> {
        const entity = Object.assign(new UserEntity(), user);
        const newUser = await this.userRepository.save(entity);

        return this.buildDto(newUser);
    }

    async update(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    async findById(id: string): Promise<UserDto> {
        const user = await this.userRepository.findOne(id, {"relations": ["desires"]});

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return this.buildDto(user);
    }

    buildDto = (user: UserEntity): UserDto => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        recipient_id: user.recipient_id,
        desires: user.desires.map(desire => desire.title)
    })
}
