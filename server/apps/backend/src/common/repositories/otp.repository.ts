import { connection } from '@/common/helpers/connection.helper';
import { OTP, User } from '@/common/entities';
import { Injectable } from '@nestjs/common';

/**
 * OTPRepository
 * This class is responsible for interacting with a MySQL database using TypeORM.
 * It provides methods for inserting, retrieving, and deleting OTPs (One-Time Passwords).
 */
@Injectable()
export class OTPRepository {
  /**
   * Insert a new OTP into the database.
   * @param topic - The topic for which the OTP is generated.
   * @param user - The user associated with the OTP.
   * @param code - The generated OTP code.
   */
  public async insert(topic: string, user: User, code: string) {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 30);
    date = date;
    date = new Date(date);

    connection
      .getRepository(OTP)
      .createQueryBuilder()
      .insert()
      .into(OTP)
      .values([
        {
          code: code,
          topic: topic,
          expireTime: date,
          user: user,
        },
      ])
      .execute();
    return;
  }

  /**
   * Retrieve all OTPs from the database.
   * @returns A promise that resolves to an array of OTP entities.
   */
  public async findAll() {
    return connection.getRepository(OTP).find({});
  }

  /**
   * Retrieve all OTPs associated with a specific user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to an array of OTP entities with user relations.
   */
  public async findAllByUserId(userId: number) {
    return connection.getRepository(OTP).find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  /**
   * Delete an OTP by its ID.
   * @param otpId - The ID of the OTP to delete.
   * @returns A promise that resolves once the OTP is deleted.
   */
  public async delete(otpId: number) {
    return connection.getRepository(OTP).delete({ id: otpId });
  }
}
