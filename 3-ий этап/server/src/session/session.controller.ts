import { Body, Controller, Post } from "@nestjs/common";
import { SessionService } from './session.service';
import { SessionLoginData } from './dto/login.dto';

@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Post()
    login(@Body() data: SessionLoginData) {
        return this.sessionService.login(data.email, data.password);
    }
}
