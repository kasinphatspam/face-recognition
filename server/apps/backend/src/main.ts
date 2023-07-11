import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import * as dotenv from 'dotenv';

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.BACKEND_SERVER_PORT);
}
bootstrap();
