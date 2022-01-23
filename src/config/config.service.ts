import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

@Injectable()
export class ConfigService {
    static getOrmConfig() {
        const {
            DATABASE_TYPE,
            DATABASE_HOST,
            DATABASE_USER,
            DATABASE_PASSWORD,
            DATABASE_PORT,
            DATABASE_NAME,
            DATABASE_ENTITIES,
            DATABASE_SYNCHRONIZE,
        } = process.env;

        return {
            type: DATABASE_TYPE || 'sqlite',
            host: DATABASE_HOST || 'localhost',
            port: DATABASE_PORT || '3306',
            username: DATABASE_USER || '',
            password: DATABASE_PASSWORD || '',
            database: DATABASE_NAME || '',
            entities: [DATABASE_ENTITIES || 'dist/**/*.entity{.ts,.js}'],
            synchronize: DATABASE_SYNCHRONIZE || true,
        };
    }

    static minCountUser(): number {
        const MIN_COUNT_USERS = process.env.MIN_COUNT_USERS;

        return parseInt(MIN_COUNT_USERS) || 3;
    }

    static maxCountUser(): number {
        const MAX_COUNT_USERS = process.env.MAX_COUNT_USERS;

        return parseInt(MAX_COUNT_USERS) || 500;
    }
}