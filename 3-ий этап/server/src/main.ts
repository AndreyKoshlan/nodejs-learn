import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log('Server is listening on port:', port);
  });
}

bootstrap();
