import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { TextBlockEntity } from './text-block.entity';
import { CreateTextBlockData } from './dto/create.dto';
import { EditTextBlockData } from './dto/edit.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class TextBlockService {
    constructor(
        @InjectRepository(TextBlockEntity)
        private readonly textBlockRepository: Repository<TextBlockEntity>,
        private readonly filesService: FilesService
    ) {}

    async create(data: CreateTextBlockData, file: Express.Multer.File) {
        let block = await this.textBlockRepository.save(data);
        if (file)
            await this.filesService.create('block', block.id, file);
        return block;
    }

    async edit(data: EditTextBlockData) {
        const block = await this.findOne(data.id);
        return this.textBlockRepository.save(data);
    }

    async delete(id: number) {
        const block = await this.findOne(id);
        return this.textBlockRepository.delete(id);
    }

    async findOne(id: number) {
        const block = await this.textBlockRepository.findOne({ where: { id } });
        if (!block)
            throw new NotFoundException();
        return block;
    }

    async findAll(group?: string) {
        if (group)
            return this.textBlockRepository.find({ where: { group }});
        return this.textBlockRepository.find();
    }

    async getImage(id: number, res: Response) {
        const block = await this.textBlockRepository.findOne({ where: { id } });
        if (!block)
            throw new NotFoundException();
        return await this.filesService.get('block', block.id, res);
    }

    async deleteUnused() {
        return this.filesService.removeUnused(this.textBlockRepository, 'block', 'id');
    }
}