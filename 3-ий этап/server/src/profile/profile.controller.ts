import { Body, Controller, Post, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileRegistrationData } from "./dto/register.dto";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {
    }

    @Post()
    create(@Body() data: ProfileRegistrationData, @Request() request) {
        return this.profileService.create(data);
    }
}
