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

  public async uploadImageToStorage(
    file: Express.Multer.File,
    folder: 'users' | 'contacts',
    userId: number,
  ): Promise<string> {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_SPACE_BUCKET,
          Key: `images/${folder}/${userId}.jpg`,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: 'image/jpg',
        }),
      );

      const urlSplit = process.env.AWS_SPACE_ENDPOINT.split('//');
      return `${urlSplit[0]}//${process.env.AWS_SPACE_BUCKET}.${urlSplit[1]}/images/${folder}/${userId}.jpg`;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
