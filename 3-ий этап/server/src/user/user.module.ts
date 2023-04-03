import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule
  ],
  providers: [UserService, ConfigService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
