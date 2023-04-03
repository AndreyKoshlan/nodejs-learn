import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesEntity } from './files.entity';
import { FilesService } from './files.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FilesEntity]),
    ],
    providers: [FilesService],
    controllers: [],
    exports: [FilesService],
})
export class FilesModule {}
