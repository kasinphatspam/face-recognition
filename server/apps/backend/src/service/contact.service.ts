import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "src/entity";
import { CreateNewContactDto } from "src/utils/dtos/contact.dto";
import { Repository } from "typeorm";
import { RestApiService } from "./restapi.service";

@Injectable()
export class ContactService {
    constructor(
        private readonly restApiService: RestApiService,
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
                    titile: body.titile,
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
        return await this.contactRepository.findOneBy({ contactId: contactId, organizationId: organizationId })
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
            .set({ encodedData: encodeId })
            .where(
                'organizationId = :organizationId AND contactId = :contactId',
                { organizationId: organizationId, contactId: contactId })
            .execute()
        return encodeId
    }

    public async recognitionImage(organizationId: number, base64: string){
        const encodeId =  await this.restApiService.recognitionImage(base64)
        if(encodeId == "UNKNOWN_CUSTOMER")
            return "unknown"
        else if(encodeId == "FACE_NOT_FOUND")
            return "face not found"
        else
            return await this.contactRepository.findOneBy({ encodedData: encodeId, organizationId: organizationId })
    }
}