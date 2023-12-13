import { connection } from '@/common/helpers/connection.helper';
import { User } from '@/common/entities';
import { CreateUserDto, UpdateUserDto } from '@/common/dto/user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isArray, isString } from 'class-validator';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import {
  GetAllUserBy,
  GetAllUserKey,
  GetUserBy,
  GetUserBySpecifyRelations,
  UserInterface,
} from '../common/interfaces/user.interface';

@Injectable()
export class UserRepository extends Repository<User> implements UserInterface {
  constructor() {
    super(User, connection.createEntityManager());
  }

  public async getAllUsers(
    relations: GetUserBySpecifyRelations,
  ): Promise<User[]> {
    return this.find({ relations: relations });
  }

  public async getAllUsersBy(
    key: GetAllUserKey,
    by: GetAllUserBy,
    relations: GetUserBySpecifyRelations,
  ): Promise<User[]> {
    switch (by) {
      case 'organization':
        return this.find({
          relations: relations,
          where: [{ organization: { id: key as number } }],
          order: {
            role: {
              name: 'ASC',
            },
          },
        });
      case 'role':
        return this.find({
          relations: relations,
          where: [{ role: { id: key as number } }],
          order: {
            role: {
              name: 'ASC',
            },
          },
        });
      case 'both':
        if (!isArray(key)) throw new Error('Wrong parameter passing');
        return this.find({
          relations: relations,
          where: [{ organization: { id: key[0] }, role: { id: key[1] } }],
          order: {
            role: {
              name: 'ASC',
            },
          },
        });
      default:
        throw new Error('Unknown parameter value');
    }
  }

  public async getUserBy(
    key: GetUserBy,
    relations: GetUserBySpecifyRelations,
  ): Promise<User> {
    if (isString(key)) {
      return this.findOne({ relations: relations, where: { email: key } });
    }
    return this.findOne({ relations: relations, where: { id: key } });
  }

  public async getUserWithPasswordBy(key: string | number): Promise<User> {
    const targetColumns = [
      'id',
      'email',
      'firstname',
      'lastname',
      'gender',
      'personalId',
      'dob',
      'image',
    ];
    if (isString(key)) {
      return this.createQueryBuilder()
        .select(targetColumns)
        .addSelect('password')
        .where('email = :email', { email: key })
        .getRawOne();
    }
    return this.createQueryBuilder()
      .select(targetColumns)
      .addSelect('password')
      .where('id = :id', { id: key })
      .getRawOne();
  }

  public async createUser(payload: CreateUserDto): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: payload.email,
          password: payload.password,
          firstname: payload.firstname,
          lastname: payload.lastname,
          gender: payload.gender,
          personalId: payload.personalId,
          image: payload.image,
        },
      ])
      .execute();
  }

  public async updateById(
    this: Repository<User>,
    id: number,
    payload: UpdateUserDto,
  ): Promise<void> {
    const user = await this.findOne({ where: { id: id } });
    if (!user)
      throw new NotFoundException(
        'Cannot update a user account that has never been created',
      );
    const { organizationId, roleId, ...data } = payload;

    if (Object.keys(data).length != 0) {
      await this.update(user.id, data);
    }

    if (organizationId) {
      await this.save({
        id: user.id,
        organization: { id: organizationId },
      });
    }

    if (roleId) {
      await this.save({
        id: user.id,
        role: { id: roleId },
      });
    }
  }

  public async deleteById(
    this: Repository<User>,
    id: number,
  ): Promise<DeleteResult> {
    return this.delete({ id: id });
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
}
