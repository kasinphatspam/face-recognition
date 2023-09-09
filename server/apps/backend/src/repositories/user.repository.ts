import { connection } from '@/connection';
import { User } from '@/entity';
import { AuthRegisterDto } from '@/utils/dtos/auth.dto';
import { UpdateUserDto } from '@/utils/dtos/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  public async getRawUserDataByEmail(email: string): Promise<User> {
    return await connection
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

  public async getUserById(userId: number): Promise<User> {
    return await connection
      .getRepository(User)
      .findOne({ relations: ['organization', 'role'], where: { id: userId } });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await connection.getRepository(User).findOneBy({ email: email });
  }

  public async getUserByIdAndOrganizationId(
    userId: number,
    organizationId: number,
  ) {
    return await connection.getRepository(User).findOne({
      relations: ['organization'],
      where: { id: userId, organization: { id: organizationId } },
    });
  }

  public async getUserByMatchingEmailOrPersonalId(
    email: string,
    personalId: string,
  ): Promise<User> {
    return await connection
      .getRepository(User)
      .findOne({ where: [{ email: email }, { personalId: personalId }] });
  }

  public async getAllUserAccount(): Promise<User[]> {
    return await connection.getRepository(User).find();
  }

  public async getAllUserInOrganization(organizationId: number) {
    return await connection.getRepository(User).find({
      where: [{ organization: { id: organizationId } }],
    });
  }

  public async getAllUserByRoleAndOrganization(
    organizationId: number,
    roleId: number,
  ): Promise<User[]> {
    return await connection.getRepository(User).find({
      where: { organization: { id: organizationId }, role: { id: roleId } },
    });
  }

  public async createNewUserAccount(
    body: AuthRegisterDto,
    password: string,
    imagePath: string,
    date: Date,
  ) {
    return await connection
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
          dob: date,
          image: imagePath,
        },
      ])
      .execute();
  }

  public async updateUserInformation(userId: number, body: UpdateUserDto) {
    return await connection.getRepository(User).update({ id: userId }, body);
  }

  public async updateUserImage(userId: number, imagePath: string) {
    return await connection
      .getRepository(User)
      .update({ id: userId }, { image: imagePath });
  }

  public async updateUserOrganization(userId: number, organizationId: number) {
    return await connection.getRepository(User).save({
      id: userId,
      organization: { id: organizationId },
    });
  }

  public async updateUserRole(userId: number, roleId: number) {
    return await connection.getRepository(User).save({
      id: userId,
      role: { id: roleId },
    });
  }

  public async deleteUserAccount(userId: number) {
    return await connection.getRepository(User).delete({ id: userId });
  }
}
