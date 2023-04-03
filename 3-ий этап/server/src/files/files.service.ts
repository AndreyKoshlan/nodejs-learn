import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as path from 'path';

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as fs from 'fs';

import { FilesEntity } from './files.entity';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FilesEntity)
        private readonly fileRepository: Repository<FilesEntity>,
        private readonly configService: ConfigService
    ) {}

    async create(essenceTable: string, essenceId: number, file: Express.Multer.File) {
        const storagePath = this.configService.get<string>('storage_path');
        if (!existsSync(storagePath)) {
            mkdirSync(storagePath, { recursive: true });
        }
        const writeStream = createWriteStream(path.resolve(storagePath, `${essenceTable}-${essenceId}`));
        writeStream.write(file.buffer);
        writeStream.end();
        const createdData = Date.now()
        return await this.fileRepository.save({ essenceTable, essenceId, createdData });
    }

    async get(table: string, id: number, res: Response) {
        const storagePath = this.configService.get<string>('storage_path');
        const filePath = path.resolve(storagePath, `${table}-${id}`);
        if (!existsSync(filePath))
            throw new NotFoundException();
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }

    async delete(id: number) {
        let fileEntity = await this.fileRepository.findOne({ where: { id } });
        const storagePath = this.configService.get<string>('storage_path');
        const filePath = path.resolve(storagePath, `${fileEntity.essenceTable}-${fileEntity.essenceId}`);
        await this.fileRepository.delete(id);
        await fs.promises.unlink(filePath);
    }

    async removeUnused(repository: Repository<any>, table: string, fieldIdName: string) {
        const storagePath = this.configService.get<string>('storage_path');
        let files = await fs.promises.readdir(storagePath);
        for (const file of files) {
            const [fileTable, fileId] = file.split('-');
            if (fileTable !== table)
                continue;

            const dbFile = await repository.findOne({ where: { [fieldIdName]: fileId } });
            const filePath = path.resolve(storagePath, file);
            const currentDate = Date.now();

            let fileEntity = await this.fileRepository.findOne({
                where: {
                    essenceId: +fileId,
                    essenceTable: fileTable,
                }
            });
            const elapsedHours = (currentDate - fileEntity?.createdData) / 3600000;
            if (elapsedHours > 1) {
                console.log(`Remove unused file: ${filePath}, reason: >1 hour`);
                await this.delete(fileEntity.id);
                continue;
            }
            if (!dbFile) {
                console.log(`Remove unused file: ${filePath}, reason: no dependencies`);
                await this.delete(fileEntity.id);
                continue;
            }
        }
    }
}
