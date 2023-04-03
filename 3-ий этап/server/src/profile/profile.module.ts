import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProfileEntity } from './profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfileEntity, UserEntity]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
        UserModule
    ],
    providers: [ProfileService, UserService],
    controllers: [ProfileController],
    exports: [ProfileService],
})
export class ProfileModule {}
