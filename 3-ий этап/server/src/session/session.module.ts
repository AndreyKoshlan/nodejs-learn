import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
        UserModule
    ],
    providers: [SessionService],
    controllers: [SessionController],
    exports: [SessionService],
})
export class SessionModule {}
