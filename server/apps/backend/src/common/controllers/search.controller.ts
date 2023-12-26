import { ContactService } from '@/contacts/contact.service';
import { UserService } from '@/users/user.service';
import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@/common/decorators/auth.decorator';
import { User } from '@/common/entities';
import { AuthGuard } from '@/common/guards/auth.guard';
import { SearchUsersAndContactsResponse } from '@/common/dto/search.dto';
import { Response } from 'express';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(
    private readonly userService: UserService,
    private readonly contactService: ContactService,
  ) {}

  @ApiOkResponse({
    description: 'Search users and contacts using name',
    type: SearchUsersAndContactsResponse,
  })
  @Get()
  @UseGuards(AuthGuard)
  public async searchUsersAndContacts(
    @RequestUser() user: User,
    @Query('query') query: string,
    @Res() res: Response,
  ) {
    const users = await this.userService.findAllByOrgAndName(
      user.organization,
      query,
    );
    const contacts = await this.contactService.findAllByOrgAndName(
      user.organization,
      query,
    );
    return res.status(HttpStatus.OK).json({ users, contacts });
  }
}
