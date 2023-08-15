import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "src/entity";
import { CreateNewContactDto } from "src/utils/dtos/contact.dto";
import { Repository } from "typeorm";
import { RecognitionApiService } from "./recognition.api.service";

@Injectable()
export class ContactService {
    constructor(
        private readonly restApiService: RecognitionApiService,
        @InjectRepository(Contact) private contactRepository: Repository<Contact>
    ) { }

    public async createNewContact(
        organizationId: number,
        body: CreateNewContactDto) {

        const contact = await this.contactRepository
            .createQueryBuilder()
            .insert()
            .into(Contact)
            .values([
                {
                    organizationId: organizationId,
                    firstname: body.firstname,
                    lastname: body.lastname,
                    organizationName: body.organizationName,
                    title: body.title,
                    officePhone: body.officePhone,
                    mobile: body.mobile,
                    email: body.email,
                    alternateEmail: body.alternateEmail,
                    dob: body.dob,
                    contactOwner: body.contactOwner,
                    createdTime: body.createdTime,
                    modifiedTime: body.modifiedTime,
                    lineId: body.lineId,
                    facebook: body.facebook,
                    linkedin: body.linkedin,
                }
            ]).execute()
        return contact.raw.insertId
    }

    public async getContactById(organizationId: number, contactId: number) {
        return await this.contactRepository.findOneBy({
            contactId: contactId, organizationId: organizationId
        })
    }

    public async getAllContact(id: number) {
        return await this.contactRepository.find({
            where: [{ organizationId: id }]
        })
    }

    public async encodeImage(organizationId: number, contactId: number, base64: string) {
        const encodeId = await this.restApiService.encodeImage(base64)
        await this.contactRepository
            .createQueryBuilder()
            .update(Contact)
            .set({ encodedId: encodeId })
            .where(
                'organizationId = :organizationId AND contactId = :contactId',
                { organizationId: organizationId, contactId: contactId })
            .execute()
        return encodeId
    }

    public async recognitionImage(organizationId: number, base64: string) {
        const resultObj = await this.restApiService.recognitionImage(base64)
        const contact = await this.contactRepository
            .findOneBy({ encodedId: resultObj.id, organizationId: organizationId })
        let object = {
            checkedTime: resultObj.checkedTime,
            accuracy: resultObj.accuracy,
            statusCode: resultObj.statusCode,
            result: contact
        }
        return object
    }
}