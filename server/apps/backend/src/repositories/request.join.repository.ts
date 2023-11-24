import { RequestJoin } from '@/entity';
import { connection } from '@/utils/connection';

export class RequestJoinOrganizationRepository {
  public async get(id: number): Promise<RequestJoin[]> {
    return connection
      .getRepository(RequestJoin)
      .find({ where: { organization: { id: id } } });
  }

  public delete(organizationId: number, userId: number) {
    return connection
      .getRepository(RequestJoin)
      .delete({ organization: { id: organizationId }, user: { id: userId } });
  }

  public deletAll(id: number) {
    return connection.getRepository(RequestJoin).delete({ user: { id: id } });
  }
}
