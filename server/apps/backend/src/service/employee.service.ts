import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getAllEmployee(id: number) {
    return await this.userRepository.find({
      where: [{ organization: { id } }],
    });
  }

  public async deleteEmployee(organizationId: number, userId: number) {
    const user = await this.userRepository.findOne({
      relations: ['organization'],
      where: { id: userId },
    });
    console.log(user);
    if (!user.organization) {
      throw new BadRequestException("User hasn't joined organization");
    }
    if (user.organization.id != organizationId)
      throw new BadRequestException(
        'Organization entered invalid: Organization ID in the user database does not match the organization ID entered.',
      );
    return await this.userRepository.update(
      { id: userId },
      {
        role: null,
        organization: null,
      },
    );
  }
}
