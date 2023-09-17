import { Contact } from './contact.entity';
import { History } from './history.entity';
import { Organization } from './organization.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { User } from './user.entity';
import { RequestJoin } from './request.join.entity';
import { OTP } from './otp.entity';

const entities = [
  User,
  Organization,
  Contact,
  Role,
  Permission,
  History,
  RequestJoin,
  OTP,
];

export {
  User,
  Organization,
  Contact,
  Role,
  Permission,
  History,
  RequestJoin,
  OTP,
};

export default entities;
