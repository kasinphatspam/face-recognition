import { ApiProperty } from '@nestjs/swagger';
import { Contact, User } from '@/common/entities';

class SearchUsersAndContactsResponse {
  @ApiProperty({ type: User, isArray: true })
  users: User[];

  @ApiProperty({ type: Contact, isArray: true })
  contacts: Contact[];
}

export { SearchUsersAndContactsResponse };
