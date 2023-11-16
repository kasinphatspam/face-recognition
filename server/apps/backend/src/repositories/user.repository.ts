import { connection } from '@/utils/connection';
import { User } from '@/entity';
import { AuthRegisterDto } from '@/utils/dtos/auth.dto';
import { UpdateUserDto } from '@/utils/dtos/user.dto';
import { Injectable } from '@nestjs/common';
import { isString } from 'class-validator';

/**
 * Define a type for specifying relations when getting a user.
 * This type allows specifying the desired relations when retrieving user data.
 */
export type GetUserBySpecifyRelations =
  | ['organization']
  | ['role']
  | ['organization', 'role'];

/**
 * UserRepository
 * This class is responsible for interacting with a MySQL database using TypeORM.
 * It provides methods for both default services and services for other components.
 */
@Injectable()
export class UserRepository {
  /**
   * Default methods adhering to the policy; should only be called from their respective services.
   * IMPORTANT: Avoid direct calls to these methods from outside the repository.
   */

  /**
   * Retrieve all users from the database.
   * @returns A promise that resolves to an array of User entities.
   */
  public async findAll(): Promise<User[]> {
    return connection.getRepository(User).find();
  }

  /**
   * Get a user by key (id or email) with specified relations.
   * @param key - The user ID or email address.
   * @param relations - An array specifying the relations to be loaded.
   * @returns A promise that resolves to a User entity.
   */
  public async getUserBy(
    key: number | string,
    relations: GetUserBySpecifyRelations,
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

  /**
   * Get a user by key with specific fields only (excluding password).
   * @param key - The user ID or email address.
   * @returns A promise that resolves to a User entity.
   */
  public async getRawUserBy(key: string | number): Promise<User> {
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
      return connection
        .getRepository(User)
        .createQueryBuilder()
        .select(targetColumns)
        .addSelect('password')
        .where('email = :email', { email: key })
        .getRawOne();
    }
    return connection
      .getRepository(User)
      .createQueryBuilder()
      .select(targetColumns)
      .addSelect('password')
      .where('id = :id', { id: key })
      .getRawOne();
  }

  /**
   * Update a user's information.
   * @param userId - The ID of the user to be updated.
   * @param body - The data to update in the user entity.
   * @returns A promise that resolves once the update is complete.
   */
  public async update(userId: number, body: UpdateUserDto) {
    return connection.getRepository(User).update({ id: userId }, body);
  }

  /**
   * Update a user's profile image.
   * @param userId - The ID of the user whose image is to be updated.
   * @param imagePath - The new image path.
   * @returns A promise that resolves once the update is complete.
   */
  public async updateImage(userId: number, imagePath: string) {
    return connection
      .getRepository(User)
      .update({ id: userId }, { image: imagePath });
  }

  /**
   * Delete a user by ID.
   * @param userId - The ID of the user to be deleted.
   * @returns A promise that resolves once the user is deleted.
   */
  public async delete(userId: number) {
    return connection.getRepository(User).delete({ id: userId });
  }

  /**
   * Customized methods adhering to the policy; can be called directly.
   * IMPORTANT: No need to import this repository; use these methods directly.
   */

  /**
   * Change a user's password.
   * @param userId - The ID of the user whose password is to be changed.
   * @param password - The new password.
   * @returns A promise that resolves once the password is changed.
   */
  public async changePassword(userId: number, password: string) {
    return connection.getRepository(User).save({
      id: userId,
      password: password,
    });
  }

  /**
   * Set a user's organization.
   * @param userId - The ID of the user.
   * @param organizationId - The ID of the organization to set.
   * @returns A promise that resolves once the organization is set.
   */
  public async setOrganization(userId: number, organizationId: number) {
    return connection.getRepository(User).save({
      id: userId,
      organization: { id: organizationId },
    });
  }

  /**
   * Set a user's role.
   * @param userId - The ID of the user.
   * @param roleId - The ID of the role to set.
   * @returns A promise that resolves once the role is set.
   */
  public async setRole(userId: number, roleId: number) {
    return connection.getRepository(User).save({
      id: userId,
      role: { id: roleId },
    });
  }

  /**
   * Insert a new user into the database.
   * @param body - The user data to be inserted.
   * @param password - The user's password.
   * @param imagePath - The path to the user's profile image.
   * @returns A promise that resolves once the user is inserted.
   */
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

  /**
   * Retrieve all users belonging to a specific organization.
   * @param organizationId - The ID of the organization.
   * @returns A promise that resolves to an array of User entities.
   */
  public async findAllByOrganizationId(organizationId: number) {
    return connection.getRepository(User).find({
      relations: ['organization'],
      where: [{ organization: { id: organizationId } }],
    });
  }

  /**
   * Retrieve all users belonging to a specific organization and role.
   * @param organizationId - The ID of the organization.
   * @param roleId - The ID of the role.
   * @returns A promise that resolves to an array of User entities.
   */
  public async findAllByOrganizationIdAndRoleId(
    organizationId: number,
    roleId: number,
  ): Promise<User[]> {
    return connection.getRepository(User).find({
      where: { organization: { id: organizationId }, role: { id: roleId } },
    });
  }

  /**
   * Check if a user with the given email or personalId already exists.
   * @param email - The email address to check.
   * @param personalId - The personal ID to check.
   * @returns A promise that resolves to a boolean indicating availability.
   */
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
