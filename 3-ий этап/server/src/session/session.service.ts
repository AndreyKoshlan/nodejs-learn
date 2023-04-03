import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class SessionService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        await this.userService.validatePassword(user, password);
        return this.generateToken(user);
    }

    async generateToken(user: UserEntity) {
        return {
            token: this.jwtService.sign({
                id: user.id,
                email: user.email,
                role: user.role
            })
        }
    }
}
