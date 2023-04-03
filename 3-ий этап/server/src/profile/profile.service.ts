import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ProfileRegistrationData } from './dto/register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
        private userService: UserService
    ) {}

    async create(data: ProfileRegistrationData) {
        const user = await this.userService.create(data.email, data.password);
        await this.profileRepository.save({...data, user});
        return user;
    }
}
