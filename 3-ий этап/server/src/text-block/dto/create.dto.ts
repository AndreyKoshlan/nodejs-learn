import { IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateTextBlockData {
    @MinLength(2)
    @MaxLength(256)
    slug: string;

    @MinLength(2)
    @MaxLength(256)
    title: string;

    @MinLength(2)
    @MaxLength(256)
    content: string;

    @IsOptional()
    @MinLength(2)
    @MaxLength(256)
    group: string;
}
