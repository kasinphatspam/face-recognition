import {
  BadRequestException,
  Inject,
  Injectable,
  Provider,
} from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config();

const DoSpacesServiceLib = 'lib:do-spaces-service';

const s3Client = new S3Client({
  endpoint: process.env.AWS_SPACE_ENDPOINT,
  forcePathStyle: false,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const DoSpacesServiceProvider: Provider<S3Client> = {
  provide: DoSpacesServiceLib,
  useValue: s3Client,
};

@Injectable()
export class UploadService {
  public constructor(
    @Inject(DoSpacesServiceLib) private readonly s3Client: S3Client,
  ) {}

  public async uploadFile(
    file: Express.Multer.File,
    userId: number,
  ): Promise<string> {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_SPACE_BUCKET,
          Key: `images/${userId}.jpg`,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: 'image/jpg',
        }),
      );
      return `${process.env.AWS_SPACE_ENDPOINT}/images/${userId}.jpg`;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
