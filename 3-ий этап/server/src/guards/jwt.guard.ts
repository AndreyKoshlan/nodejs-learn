import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return false;
        }

        const token = authorization.slice(7, authorization.length);

        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.userRepository.findOne({ where: {id: decoded.id }});
            request.user = user;
            return true;
        } catch (err) {
            return false;
        }
    }
}