import { connection } from '@/utils/connection';
import { User } from '@/entity';
import { AuthRegisterDto } from '@/utils/dtos/auth.dto';
import { UpdateUserDto } from '@/utils/dtos/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  public async getRawUserDataByEmail(email: string): Promise<User> {
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
      .where('email = :email', { email: email })
      .getRawOne();
  }

  public async getUserById(userId: number, relations: string[]): Promise<User> {
    if (!relations) {
      return connection
        .getRepository(User)
        .findOne({ relations: relations, where: { id: userId } });
    }
    return connection
      .getRepository(User)
      .findOne({ relations: ['organization', 'role'], where: { id: userId } });
  }

  public async getUserByEmail(
    email: string,
    relations: string[],
  ): Promise<User> {
    if (!relations) {
      return connection
        .getRepository(User)
        .findOne({ relations: relations, where: { email: email } });
    }
    return connection
      .getRepository(User)
      .findOne({ relations: relations, where: { email: email } });
  }

  public async findAll(): Promise<User[]> {
    return connection.getRepository(User).find();
  }

  public async findAllByOrganizationId(organizationId: number) {
    return connection.getRepository(User).find({
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

  public async updateUserOrganization(userId: number, organizationId: number) {
    return connection.getRepository(User).save({
      id: userId,
      organization: { id: organizationId },
    });
  }

  public async updateUserRole(userId: number, roleId: number) {
    return connection.getRepository(User).save({
      id: userId,
      role: { id: roleId },
    });
  }

  public async delete(userId: number) {
    return connection.getRepository(User).delete({ id: userId });
  }
}
