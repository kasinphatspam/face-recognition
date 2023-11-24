import { RequestJoin } from '@/entity';
import { RequestJoinOrganizationRepository } from '@/repositories/request.join.repository';

export class RequestJoinService {
  constructor(
    private readonly requestJoinRepository: RequestJoinOrganizationRepository,
  ) {}

  public async getRequestJoinByOrganizationId(
    id: number,
  ): Promise<RequestJoin[]> {
    return this.requestJoinRepository.get(id);
  }

  public async accept(id: number) {
    await this.requestJoinRepository.deletAll(id);
  }

  public async reject(organizationId: number, userId: number) {
    await this.requestJoinRepository.delete(organizationId, userId);
  }
}
