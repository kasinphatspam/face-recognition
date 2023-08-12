import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity";
import { IsNull, Repository } from "typeorm";

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    public async getAllEmployee(id: number) {
        return await this.userRepository.find(
            { where: [
                { organizationId: id },
            ] }
        )
    
    }

    public async deleteEmployee(organizationId: number, userId: number) {
        const userProperty = await this.userRepository.findOneBy({ userId: userId })
        if (userProperty.organizationId != organizationId)
            throw new BadRequestException(
                "Organization entered invalid: Organization ID in the user database does not match the organization ID entered."
            )
        return await this.userRepository.update({ userId: userId }, {
            organizationId: null
        })
    }

}