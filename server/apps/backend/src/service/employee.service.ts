import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity";
import { Repository } from "typeorm";

export class EmployeeService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    public async getAllEmployee(organizationId: number) {
        return await this.userRepository.findBy({ organizationId: organizationId })
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