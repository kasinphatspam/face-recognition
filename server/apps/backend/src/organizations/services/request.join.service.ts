import { RequestJoin } from '@/common/entities';
import { RequestJoinOrganizationRepository } from '@/organizations/repositories/request.join.repository';
import { UserRepository } from '@/users/user.repository';

export class RequestJoinService {
  constructor(
    private readonly requestJoinRepository: RequestJoinOrganizationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getRequestJoinBy(id: number): Promise<RequestJoin[]> {
    return this.requestJoinRepository.getAll(id, 'organization');
  }

  public async accept(userId: number, requestId: number) {
    const request = await this.requestJoinRepository.getRequestById(requestId);
    await this.userRepository.updateById(userId, {
      organizationId: request.organization.id,
    });

    await this.userRepository.updateById(userId, {
      organizationId: request.organization.id,
    });
    await this.requestJoinRepository.deletAllBy(userId, 'users');
  }

  public async reject(organizationId: number, userId: number) {
    await this.requestJoinRepository.deleteBy(organizationId, userId);
  }

  public async rejectAll(organizationId: number) {
    await this.requestJoinRepository.deletAllBy(organizationId, 'organization');
  }
}
