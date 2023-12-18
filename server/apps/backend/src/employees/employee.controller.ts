import { User } from '@/common/entities';
import { RequestUser } from '@/common/decorators/auth.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { UserService } from '@/users/user.service';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminGuard } from '@/common/guards/admin.guard';

@ApiTags('Employees')
@Controller()
export class EmployeeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async getAllEmployee(@RequestUser() user: User, @Res() res: Response) {
    if (!user.organization)
      throw new NotFoundException('Not found organization.');
    const users = await this.userService.findAllBy(user.organization.id);
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  public async getEmployeeById(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserBy(userId, null);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put(':userId/role/:roleId')
  @UseGuards(AuthGuard, AdminGuard)
  public async changeEmployeeRole(
    @Param('roleId') roleId: number,
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    await this.userService.update(userId, { roleId: roleId });
    res.status(HttpStatus.OK).json({
      message: `Change role of user id: ${userId} to role id: ${roleId} successfully.`,
    });
  }

  @Delete(':userId')
  @UseGuards(AuthGuard, AdminGuard)
  public async deleteEmployeeById(
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    await this.userService.exitOrg(userId);
    return res.status(HttpStatus.OK).json({
      message: `Successfully deleted employee id ${userId}`,
    });
  }
}
