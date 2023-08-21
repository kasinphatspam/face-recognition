import { Injectable } from '@nestjs/common';
import { writeFileSync, unlinkSync } from 'fs';
import * as path from 'path';

export type Folder = 'users' | 'contact';

@Injectable()
export class ImageService {
  public readonly folderPath = path.join(__dirname, '../../images');

  public defaultImagePath(folder: Folder): string {
    return `${process.env.BACKEND_URL}/images/${folder}/default.jpeg`;
  }

  public getImagePath(folder: Folder, filename: string): string {
    return path.join(this.folderPath, folder, filename);
  }

  public saveImageFromBase64(
    base64: string,
    folderName: Folder,
    fileName: string,
  ): string {
    const fullPath = path.join(this.folderPath, folderName, fileName);
    const buffer = Buffer.from(base64, 'base64');
    writeFileSync(fullPath, buffer);

    return `${process.env.BACKEND_URL}/images/${folderName}/${fileName}`;
  }

  public deleteImageFromName(folderName: Folder, fileName: string): void {
    const fullPath = path.join(this.folderPath, folderName, fileName);
    try {
      unlinkSync(fullPath);
    } catch (err) {}
  }
}
