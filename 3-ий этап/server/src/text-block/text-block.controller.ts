import {
    Body,
    Controller,
    Post,
    UseGuards,
    Delete,
    Get,
    Put,
    Param,
    Query,
    UseInterceptors, UploadedFile, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AdminGuard } from '../guards/admin.guard';
import { CreateTextBlockData } from './dto/create.dto';
import { TextBlockService } from './text-block.service';
import { EditTextBlockData } from './dto/edit.dto';

@Controller('block')
export class TextBlockController {
    constructor(private textBlockService: TextBlockService) {}

    @Post()
    @UseGuards(AdminGuard)
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() data: CreateTextBlockData,
           @UploadedFile() file: Express.Multer.File)
    {
        return this.textBlockService.create(data, file);
    }

    @Put()
    @UseGuards(AdminGuard)
    edit(@Body() data: EditTextBlockData) {
        return this.textBlockService.edit(data);
    }

    @Delete()
    @UseGuards(AdminGuard)
    delete(@Body() {id}) {
        return this.textBlockService.delete(id);
    }

    @Get('/:id')
    findOne(@Param('id') id) {
        return this.textBlockService.findOne(id);
    }

    @Get()
    find(@Query('group') group?: string) {
        return this.textBlockService.findAll(group);
    }

    @Get('/image/:id')
    getImage(@Param('id') id, @Res() res: Response) {
        return this.textBlockService.getImage(id, res);
    }

    @Delete('/unusedImages')
    @UseGuards(AdminGuard)
    deleteUnused() {
        return this.textBlockService.deleteUnused();
    }
}
