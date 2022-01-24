import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as basicAuth from 'express-basic-auth';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "./config/config.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const user = ConfigService.basicAuthUser();
    const password = ConfigService.basicAuthPassword();

    app.use(
        ['/docs'],
        basicAuth({
            challenge: true,
            users: {
                [user]: password
            },
        }),
    );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: false
            }
        })
    );

    const config = new DocumentBuilder()
        .setTitle('Secret Santa')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}

bootstrap();
