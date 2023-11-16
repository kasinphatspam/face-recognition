import { History, Organization, User } from '@/entity';
import { connection } from '@/utils/connection';
import { RecognitionImageResponseDto } from '@/utils/dtos/contact.dto';
import { Injectable } from '@nestjs/common';

/**
 * HistoryRepository
 * This class is responsible for interacting with a MySQL database using TypeORM.
 * It provides methods for retrieving, inserting, and removing history records.
 */
@Injectable()
export class HistoryRepository {
  /**
   * Retrieve all history records associated with a specific user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to an array of History entities with user relations.
   */
  public async findAllByUserId(userId: number) {
    return connection
      .getRepository(History)
      .find({ relations: ['users'], where: { user: { id: userId } } });
  }

  /**
   * Retrieve all history records associated with a specific organization.
   * @param organizationId - The ID of the organization.
   * @returns A promise that resolves to an array of History entities with user relations.
   */
  public async findAllByOrganizationId(organizationId: number) {
    return connection.getRepository(History).find({
      relations: ['users'],
      where: { organization: { id: organizationId } },
    });
  }

  /**
   * Insert a new history record into the database.
   * @param organization - The organization associated with the history record.
   * @param user - The user associated with the history record.
   * @param result - The result of the recognition image.
   * @returns A promise that resolves once the history record is inserted.
   */
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

  /**
   * Remove history records (Placeholder method - Implementation needed).
   */
  public async remove() {
    return;
  }
}
