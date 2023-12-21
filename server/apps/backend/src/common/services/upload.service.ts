import {
  BadRequestException,
  Inject,
  Injectable,
  Provider,
} from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config();

type Folder = 'users' | 'contacts';

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
    folder: Folder,
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

      return `${process.env.AWS_SPACE_URL}/images/${folder}/${userId}.jpg`;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  public async deleteImageFromStorage(
    folder: Folder,
    userId: number,
  ): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_SPACE_BUCKET,
          Key: `images/${folder}/${userId}.jpg`,
        }),
      );
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }
}
