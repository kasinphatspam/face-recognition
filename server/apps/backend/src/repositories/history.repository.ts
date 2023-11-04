import { History, Organization, User } from '@/entity';
import { connection } from '@/utils/connection';
import { RecognitionImageResponseDto } from '@/utils/dtos/contact.dto';
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
