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
            username: DATABASE_USER || 'root',
            password: DATABASE_PASSWORD || 'password',
            database: DATABASE_NAME || 'santa',
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

    static basicAuthPassword(): string {
        const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

        return AUTH_PASSWORD || 'awdasd';
    }

    static basicAuthUser(): string {
        const AUTH_USER = process.env.AUTH_USER;

        return AUTH_USER || 'dev';
    }
}