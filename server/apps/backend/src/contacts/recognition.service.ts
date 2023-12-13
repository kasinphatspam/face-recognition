import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import {
  CreatePackageResponseDto,
  EncodeImageResponseDto,
  RecognitionImageResponseDto,
} from '@/common/dto/contact.dto';
import { Contact } from '@/common/entities';

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
    image: string | Express.Multer.File,
    contact: Contact,
  ): Promise<string> {
    let response: AxiosResponse;

    if (typeof image === 'string') {
      response = await axios.put(
        `${process.env.ML_SERVER_URL}/face-recognition`,
        {
          packageKey: packageKey,
          image: image,
          encodedId: contact.encodedId,
        },
      );
    } else {
      const blob = new Blob([image.buffer], { type: image.mimetype });
      const formData = new FormData();
      formData.append('image', blob, image.originalname);
      formData.append('packageKey', packageKey);
      formData.append('encodeId', contact.encodedId);

      response = await axios.put(
        `${process.env.ML_SERVER_URL}/face-recognition-file`,
        formData,
      );
    }

    if (response.status !== 200) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const obj: EncodeImageResponseDto = JSON.parse(
      JSON.stringify(response.data),
    );

    console.log(obj);

    if (obj.statusCode === -1) {
      throw new BadRequestException('Face not found');
    }
    return obj.encodedId;
  }

  public async deleteEncodeImage(packageKey: string, encodedId: string) {
    const response = await axios.delete(
      `${process.env.ML_SERVER_URL}/face-recognition`,
      {
        data: {
          packageKey: packageKey,
          encodedId: encodedId,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`Error! status: ${response.status}`);
    }

    return response.data;
  }

  public async recognitionImage(
    packageKey: string,
    image: string | Express.Multer.File,
  ): Promise<RecognitionImageResponseDto[]> {
    let response: AxiosResponse;

    if (typeof image === 'string') {
      response = await axios.post(
        `${process.env.ML_SERVER_URL}/face-recognition`,
        {
          packageKey: packageKey,
          image: image,
        },
      );
    } else {
      const blob = new Blob([image.buffer], { type: image.mimetype });
      const formData = new FormData();
      formData.append('image', blob, image.originalname);
      formData.append('packageKey', packageKey);

      response = await axios.post(
        `${process.env.ML_SERVER_URL}/face-recognition-file`,
        formData,
      );
    }

    if (response.status !== 200) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const recognitionDtoArray = convertJsonToDto(JSON.stringify(response.data));
    const array: RecognitionImageResponseDto[] = [];

    if (!Array.isArray(recognitionDtoArray)) {
      array.push(recognitionDtoArray as RecognitionImageResponseDto);
      return array;
    }
    return recognitionDtoArray as RecognitionImageResponseDto[];
  }
}

function convertJsonToDto(
  jsonString: string,
): RecognitionImageResponseDto | RecognitionImageResponseDto[] {
  const jsonData = JSON.parse(jsonString);
  try {
    if (Array.isArray(jsonData)) {
      return jsonData.map(
        (item) =>
          new RecognitionImageResponseDto(
            item.id,
            item.statusCode,
            item.accuracy,
            new Date(item.checkedTime),
          ),
      );
    } else {
      return new RecognitionImageResponseDto(
        jsonData.id,
        jsonData.statusCode,
        jsonData.accuracy,
        new Date(jsonData.checkedTime),
      );
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return Array.isArray(jsonData) ? [] : null;
  }
}
