import { Organization, RequestJoin, User } from '@/common/entities';
import { connection } from '@/common/helpers/connection.helper';
import {
  RequestJoinInterface,
  RequestSelectionBy,
} from '@/common/interfaces/request.join.interface';
import * as moment from 'moment-timezone';
import { Repository } from 'typeorm';

export class RequestJoinRepository
  extends Repository<RequestJoin>
  implements RequestJoinInterface
{
  constructor() {
    super(RequestJoin, connection.createEntityManager());
  }

  public async getAll(
    id: number,
    selection: RequestSelectionBy,
  ): Promise<RequestJoin[]> {
    if (selection == 'organization') {
      return this.find({
        relations: ['user', 'organization'],
        where: { organization: { id: id } },
      });
    } else if (selection == 'users') {
      return this.find({
        relations: ['user', 'organization'],
        where: { user: { id: id } },
      });
    }
  }

  public async getRequestById(requestId: number): Promise<RequestJoin> {
    return this.findOne({
      relations: ['user', 'organization'],
      where: { id: requestId },
    });
  }

  public async createNewRequest(organization: Organization, user: User) {
    return this.createQueryBuilder()
      .insert()
      .into(RequestJoin)
      .values({
        organization: organization,
        user: user,
        requestTime: moment.tz('Asia/Bangkok').format(),
      })
      .execute();
  }

  public deleteById(requestId: number) {
    return this.delete({
      id: requestId,
    });
  }

  public deleteAllBy(id: number, selection: RequestSelectionBy) {
    if (selection == 'organization') {
      return this.delete({ organization: { id: id } });
    } else if (selection == 'users') {
      return this.delete({ user: { id: id } });
    }
  }
}
