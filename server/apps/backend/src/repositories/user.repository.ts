import { connection } from '@/utils/connection';
import { User } from '@/entity';
import { AuthRegisterDto } from '@/utils/dtos/auth.dto';
import { UpdateUserDto } from '@/utils/dtos/user.dto';
import { Injectable } from '@nestjs/common';
import { isString } from 'class-validator';
@Injectable()
export class UserRepository {
  public async getRawUserBy(key: string | number): Promise<User> {
    if (isString(key)) {
      return connection
        .getRepository(User)
        .createQueryBuilder()
        .select([
          'id',
          'email',
          'firstname',
          'lastname',
          'gender',
          'personalId',
          'dob',
          'image',
        ])
        .addSelect('password')
        .where('email = :email', { email: key })
        .getRawOne();
    }
    return connection
      .getRepository(User)
      .createQueryBuilder()
      .select([
        'id',
        'email',
        'firstname',
        'lastname',
        'gender',
        'personalId',
        'dob',
        'image',
      ])
      .addSelect('password')
      .where('id = :id', { id: key })
      .getRawOne();
  }

  public async getUserBy(
    key: number | string,
    relations: ['organization'] | ['role'] | ['organization', 'role'],
  ): Promise<User> {
    if (isString(key)) {
      return connection
        .getRepository(User)
        .findOne({ relations: relations, where: { email: key } });
    }
    return connection
      .getRepository(User)
      .findOne({ relations: relations, where: { id: key } });
  }

  public async findAll(): Promise<User[]> {
    return connection.getRepository(User).find();
  }

  public async findAllByOrganizationId(organizationId: number) {
    return connection.getRepository(User).find({
      relations: ['organization'],
      where: [{ organization: { id: organizationId } }],
    });
  }

  public async findAllByOrganizationIdAndRoleId(
    organizationId: number,
    roleId: number,
  ): Promise<User[]> {
    return connection.getRepository(User).find({
      where: { organization: { id: organizationId }, role: { id: roleId } },
    });
  }

  public async isAvailable(
    email: string,
    personalId: string,
  ): Promise<boolean> {
    const user = await connection.getRepository(User).find({
      where: [{ email: email }, { personalId: personalId }],
    });
    return user.length > 0;
  }

  public async insert(
    body: AuthRegisterDto,
    password: string,
    imagePath: string,
  ) {
    return connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: body.email,
          password: password,
          firstname: body.firstname,
          lastname: body.lastname,
          gender: body.gender,
          personalId: body.personalId,
          image: imagePath,
        },
      ])
      .execute();
  }

  public async update(userId: number, body: UpdateUserDto) {
    return connection.getRepository(User).update({ id: userId }, body);
  }

  public async updateImage(userId: number, imagePath: string) {
    return connection
      .getRepository(User)
      .update({ id: userId }, { image: imagePath });
  }

  public async setOrganization(userId: number, organizationId: number) {
    return connection.getRepository(User).save({
      id: userId,
      organization: { id: organizationId },
    });
  }

  public async setRole(userId: number, roleId: number) {
    return connection.getRepository(User).save({
      id: userId,
      role: { id: roleId },
    });
  }

  public async changePassword(userId: number, password: string) {
    return connection.getRepository(User).save({
      id: userId,
      password: password,
    });
  }

  public async delete(userId: number) {
    return connection.getRepository(User).delete({ id: userId });
  }
}
