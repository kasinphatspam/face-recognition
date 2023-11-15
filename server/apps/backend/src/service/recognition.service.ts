import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  CreatePackageResponseDto,
  EncodeImageResponseDto,
  RecognitionImageResponseDto,
} from '@/utils/dtos/contact.dto';
import { Contact } from '@/entity';

@Injectable()
export class RecognitionService {
  public async createPackage() {
    const response = await axios.post(
      `${process.env.ML_SERVER_URL}/dataset-file`,
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

  public async deletePackage(packageKey: string) {
    const response = await axios.delete(
      `${process.env.ML_SERVER_URL}/dataset-file`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          packageKey: packageKey,
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

  public async encodeImage(
    packageKey: string,
    image: string,
    contact: Contact,
  ): Promise<string> {
    const response = await axios.put(
      `${process.env.ML_SERVER_URL}/face-recognition`,
      {
        packageKey: packageKey,
        imageBase64: image,
        encodedId: contact.encodedId,
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

  public async deleteEncodeImage(packageKey: string, encodedId: string) {
    const response = await axios.put(
      `${process.env.ML_SERVER_URL}/face-recognition/dataset/delete`,
      {
        packageKey: packageKey,
        encodedId: encodedId,
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

    return response.data;
  }

  public async recognitionImage(packageKey: string, image: string) {
    console.log(`${packageKey}`);
    const response = await axios.post(
      `${process.env.ML_SERVER_URL}/face-recognition`,
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
