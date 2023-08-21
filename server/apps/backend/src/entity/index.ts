import { Contact } from './contact.entity';
import { Department } from './department.entity';
import { Organization } from './organization.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

const entities = [User, Organization, Department, Contact, Role, Permission];

export { User, Organization, Department, Contact, Role, Permission };

export default entities;
