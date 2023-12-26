import { Contact } from './contact.entity';
import { History } from './history.entity';
import { Organization } from './organization.entity';
import { Role } from './role.entity';
import { User } from './user.entity';
import { RequestJoin } from './request.join.entity';
import { OTP } from './otp.entity';
import { Plan } from './plan.entity';
import { Notification } from './notification.entity';

const entities = [
  User,
  Organization,
  Contact,
  Role,
  History,
  RequestJoin,
  OTP,
  Plan,
  Notification,
];

export {
  User,
  Organization,
  Contact,
  Role,
  History,
  RequestJoin,
  OTP,
  Plan,
  Notification,
};

export default entities;
