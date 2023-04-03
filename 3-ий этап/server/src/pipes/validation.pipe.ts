import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = classToPlain(value);
        if (typeof obj !== 'object')
            return obj;
        const errors = await validate(obj);

        if (errors.length) {
            let messages = errors.map(err => {
                return `${err.property}: ${Object.values(err.constraints).join(', ')}`
            })
            throw new HttpException(messages, 400);
        }
        return value;
    }

}