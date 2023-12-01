import { RequestJoin } from '@/entity';
import { RequestJoinOrganizationRepository } from '@/repositories/request.join.repository';
import { UserRepository } from '@/repositories/user.repository';

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
    await this.userRepository.setOrganization(userId, request.organization.id);
    await this.requestJoinRepository.deletAllBy(userId, 'users');
  }

  public async reject(organizationId: number, userId: number) {
    await this.requestJoinRepository.delete(organizationId, userId);
  }

  public async rejectAll(organizationId: number) {
    await this.requestJoinRepository.deletAllBy(organizationId, 'organization');
  }
}
