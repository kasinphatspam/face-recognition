import { RequestJoin } from '@/entity';
import { connection } from '@/utils/connection';

type RequestSelectionBy = 'organization' | 'users';

export class RequestJoinOrganizationRepository {
  public async getAll(
    id: number,
    selection: RequestSelectionBy,
  ): Promise<RequestJoin[]> {
    if (selection == 'organization') {
      return connection
        .getRepository(RequestJoin)
        .find({ where: { organization: { id: id } } });
    } else if (selection == 'users') {
      return connection
        .getRepository(RequestJoin)
        .find({ where: { user: { id: id } } });
    }
  }

  public async getRequestById(requestId: number): Promise<RequestJoin> {
    return connection
      .getRepository(RequestJoin)
      .findOne({ relations: ['organization'], where: { id: requestId } });
  }

  public delete(organizationId: number, userId: number) {
    return connection
      .getRepository(RequestJoin)
      .delete({ organization: { id: organizationId }, user: { id: userId } });
  }

  public deletAllBy(id: number, selection: RequestSelectionBy) {
    if (selection == 'organization') {
      return connection
        .getRepository(RequestJoin)
        .delete({ organization: { id: id } });
    } else if (selection == 'users') {
      return connection.getRepository(RequestJoin).delete({ user: { id: id } });
    }
  }
}
