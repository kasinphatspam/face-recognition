import { History, Organization, User } from '@/common/entities';
import { connection } from '@/common/helpers/connection.helper';
import { RecognitionImageResponseJson } from '@/common/dto/contact.dto';
import { Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class HistoryRepository extends Repository<History> {
  constructor() {
    super(History, connection.createEntityManager());
  }

  public async findAllByUserId(userId: number) {
    return connection
      .getRepository(History)
      .find({ relations: ['users'], where: { user: { id: userId } } });
  }

  public async findAllByOrganizationId(organizationId: number) {
    return connection.getRepository(History).find({
      relations: ['users'],
      where: { organization: { id: organizationId } },
    });
  }

  public async creaetNewHistory(
    organization: Organization,
    user: User,
    result: RecognitionImageResponseJson,
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(History)
      .values([
        {
          user: user,
          organization: organization,
          result: result,
        },
      ])
      .execute();
  }

  // public async remove() {
  //   return;
  // }
}
