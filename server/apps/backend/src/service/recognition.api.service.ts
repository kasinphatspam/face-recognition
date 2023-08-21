import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import {
  CreatePackageResponseDto,
  EncodeImageResponseDto,
  RecognitionImageResponseDto,
} from 'src/utils/dtos/contact.dto';

dotenv.config();
export class RecognitionApiService {
  public async createPackage() {
    const response = await fetch(
      `http://${process.env.ML_SERVER_IP_ADDRESS}:${process.env.ML_SERVER_PORT}/create-package`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    let obj: CreatePackageResponseDto = await JSON.parse(
      JSON.stringify(result),
    );
    return obj.packageKey;
  }

  public async encodeImage(packageKey: string, image: string): Promise<string> {
    const response = await fetch(
      `http://${process.env.ML_SERVER_IP_ADDRESS}:${process.env.ML_SERVER_PORT}/face-recognition`,
      {
        method: 'PUT',
        body: JSON.stringify({
          packageKey: packageKey,
          imageBase64: image,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    let obj: EncodeImageResponseDto = await JSON.parse(JSON.stringify(result));
    return obj.encodedId;
  }

  public async recognitionImage(packageKey: string, image: string) {
    const response = await fetch(
      `http://${process.env.ML_SERVER_IP_ADDRESS}:${process.env.ML_SERVER_PORT}/face-recognition`,
      {
        method: 'POST',
        body: JSON.stringify({
          packageKey: packageKey,
          imageBase64: image,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    let object: RecognitionImageResponseDto = await JSON.parse(
      JSON.stringify(result),
    );
    return object;
  }
}
