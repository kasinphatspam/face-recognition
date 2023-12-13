import { History, Organization, User } from '@/common/entities';
import { connection } from '@/common/helpers/connection.helper';
import { RecognitionImageResponseDto } from '@/common/dto/contact.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryRepository {
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

  public async insert(
    organization: Organization,
    user: User,
    result: RecognitionImageResponseDto,
  ) {
    return connection
      .getRepository(History)
      .createQueryBuilder()
      .insert()
      .into(History)
      .values([
        {
          detectedTime: new Date(),
          user: user,
          organization: organization,
          result: result,
        },
      ]);
  }

  public async remove() {
    return;
  }
}
