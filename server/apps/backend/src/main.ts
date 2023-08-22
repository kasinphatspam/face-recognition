import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/module/app.module';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );
  await app.listen(process.env.BACKEND_SERVER_PORT);
}
bootstrap();
