import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import baseConfig from './config/base.config';
import postgresConfig from './config/postgres.config';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { SessionModule } from './session/session.module';
import { FilesModule } from './files/files.module';
import { TextBlockModule } from './text-block/text-block.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [baseConfig, postgresConfig],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('postgres_host'),
                port: configService.get<number>('postgres_port'),
                username: configService.get<string>('postgres_username'),
                password: configService.get<string>('postgres_password'),
                database: configService.get<string>('postgres_db'),
                synchronize: true,
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        UserModule,
        ProfileModule,
        SessionModule,
        TextBlockModule,
        FilesModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
