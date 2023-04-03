import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TextBlockEntity } from './text-block.entity';
import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';
import { FilesEntity } from '../files/files.entity';
import { FilesService } from '../files/files.service';
import { UserEntity } from '../user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TextBlockEntity, FilesEntity, UserEntity]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
    ],
    providers: [TextBlockService, FilesService, ConfigService],
    controllers: [TextBlockController],
    exports: [TextBlockService],
})
export class TextBlockModule {}
