import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { EncodeImageResponseDto } from 'src/utils/dtos/contact.dto';

dotenv.config()
export class RestApiService {

    public async encodeImage(organizationId: number, contactId: number, image: string): Promise<string> {
        const response = await fetch(`http://${process.env.ML_SERVER_IP_ADDRESS}:${process.env.ML_SERVER_PORT}/face-recognition`, {
            method: 'PUT',
            body: JSON.stringify({
                imageBase64: image,
                organizationId: organizationId,
                contactId: contactId
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json()
        let obj: EncodeImageResponseDto = await JSON.parse(JSON.stringify(result))
        return obj.encodedData
    }
}