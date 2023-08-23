import * as dotenv from 'dotenv';
import {
  CreatePackageResponseDto,
  EncodeImageResponseDto,
  RecognitionImageResponseDto,
} from '@/utils/dtos/contact.dto';
import axios from 'axios';

dotenv.config();
export class RecognitionApiService {
  public async createPackage() {
    const response = await axios.get(
      `http://${process.env.ML_SERVER_URL}/create-package`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const obj: CreatePackageResponseDto = JSON.parse(
      JSON.stringify(response.data),
    );
    return obj.packageKey;
  }

  public async encodeImage(packageKey: string, image: string): Promise<string> {
    const response = await axios.put(
      `http://${process.env.ML_SERVER_URL}/face-recognition`,
      {
        packageKey: packageKey,
        imageBase64: image,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const obj: EncodeImageResponseDto = JSON.parse(
      JSON.stringify(response.data),
    );
    return obj.encodedId;
  }

  public async recognitionImage(packageKey: string, image: string) {
    const response = await axios.post(
      `http://${process.env.ML_SERVER_URL}/face-recognition`,
      {
        packageKey: packageKey,
        imageBase64: image,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const object: RecognitionImageResponseDto = JSON.parse(
      JSON.stringify(response.data),
    );
    return object;
  }
}
