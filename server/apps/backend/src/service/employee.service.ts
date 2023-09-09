import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAllEmployee(organizationId: number) {
    return await this.userRepository.getAllUserInOrganization(organizationId);
  }

  public async deleteEmployee(organizationId: number, userId: number) {
    const user = await this.userRepository.getUserById(userId);
    console.log(user);
    if (!user.organization) {
      throw new BadRequestException("User hasn't joined organization");
    }
    if (user.organization.id != organizationId)
      throw new BadRequestException(
        'Organization entered invalid: Organization ID in the user database does not match the organization ID entered.',
      );
    await this.userRepository.updateUserOrganization(userId, null);
    await this.userRepository.updateUserRole(userId, null);
  }
}
