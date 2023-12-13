import { User } from '@/common/entities';
import { CreateUserDto, UpdateUserDto } from '@/common/dto/user.dto';
import { DeleteResult, InsertResult } from 'typeorm';

type GetUserBySpecifyRelations =
  | null
  | ['organization']
  | ['role']
  | ['organization', 'role'];

type GetUserBy = number | string;

type GetAllUserKey = number | number[];
type GetAllUserBy = 'organization' | 'role' | 'both';

interface UserInterface {
  getAllUsersBy(
    key: GetAllUserKey,
    by: GetAllUserBy,
    relations: GetUserBySpecifyRelations,
  ): Promise<User[]>;
  getAllUsers(relations: GetUserBySpecifyRelations): Promise<User[]>;
  getUserBy(
    key: GetUserBy,
    relations: GetUserBySpecifyRelations,
  ): Promise<User>;
  createUser(payload: CreateUserDto): Promise<InsertResult>;
  updateById(id: number, payload: UpdateUserDto): Promise<void>;
  deleteById(id: number): Promise<DeleteResult>;
}

export { UserInterface };
export { GetUserBySpecifyRelations, GetUserBy, GetAllUserKey, GetAllUserBy };
