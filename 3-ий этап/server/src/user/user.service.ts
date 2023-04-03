import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService
    ) {}

    async create(email: string, password: string) {
        const salt = this.configService.get<string>('postgres_salt');
        const passwordHash = await bcrypt.hash(password, salt);
        return this.userRepository.save({ email, passwordHash });
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {email}
        });
        if (!user)
            throw new NotFoundException();
        return user;
    }

    async validatePassword(user: UserEntity, password: string) {
        const passwordEquals = await bcrypt.compare(password, user.passwordHash);
        if (!passwordEquals)
            throw new UnauthorizedException();
        return true;
    }
}
