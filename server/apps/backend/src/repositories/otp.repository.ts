import { connection } from '@/utils/connection';
import { OTP, User } from '@/entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OTPRepository {
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

  public async findAll() {
    return connection.getRepository(OTP).find({});
  }

  public async findAllByUserId(userId: number) {
    return connection.getRepository(OTP).find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  public async delete(otpId: number) {
    return connection.getRepository(OTP).delete({ id: otpId });
  }
}
