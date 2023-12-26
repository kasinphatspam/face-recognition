import { History, Organization, User } from '@/common/entities';
import { connection } from '@/common/helpers/connection.helper';
import { RecognitionImageResponseJson } from '@/common/dto/contact.dto';
import { Injectable } from '@nestjs/common';
import { Between, InsertResult, Repository } from 'typeorm';
import * as moment from 'moment-timezone';

@Injectable()
export class HistoryRepository extends Repository<History> {
  constructor() {
    super(History, connection.createEntityManager());
  }

  public async findAllByUserId(userId: number) {
    return this.find({ relations: ['user'], where: { user: { id: userId } } });
  }

  public async findAllByOrganizationId(organizationId: number, date: string) {
    if (!date) {
      return this.find({
        relations: ['user'],
        where: { organization: { id: organizationId } },
      });
    }
    return this.find({
      relations: ['user'],
      where: {
        organization: { id: organizationId },
        detectedTime: Between(
          new Date(`${date}T00:00:00`),
          new Date(`${date}T23:59:59`),
        ),
      },
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
          detectedTime: moment.tz('Asia/Bangkok').format(),
          result: result,
        },
      ])
      .execute();
  }

  // public async remove() {
  //   return;
  // }
}
