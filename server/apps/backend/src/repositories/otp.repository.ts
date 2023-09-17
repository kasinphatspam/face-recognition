import { connection } from '@/connection';
import { OTP, User } from '@/entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OTPRepository {
  public async insert(topic: string, user: User) {
    connection
      .getRepository(OTP)
      .createQueryBuilder()
      .insert()
      .into(OTP)
      .values([
        {
          code: 'generate code',
          topic: topic,
          expireTime: new Date(),
          user: user,
        },
      ])
      .execute();
    return;
  }

  public async findAll() {
    return connection.getRepository(OTP).find({});
  }

  public async findAllByUserId(userId: number) {
    return connection.getRepository(OTP).find({
      relations: ['users'],
      where: { user: { id: userId } },
    });
  }

  public async delete(otpId: number) {
    return connection.getRepository(OTP).delete({ id: otpId });
  }
}
