import {
  Get,
  Param,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { CreateNewRoleDto, EditRoleDto } from '../common/dto/role.dto';
import { Response } from 'express';
import { RoleService } from './role.service';
import { RequestUser } from '@/common/decorators/auth.decorator';
import { AuthGuard } from '@/common/guards/auth.guard';
import { User } from '@/common/entities';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async getAllRole(@RequestUser() user: User, @Res() res: Response) {
    const roles = await this.roleService.findAll(user.organization.id);
    return res.status(HttpStatus.OK).json(roles);
  }

  @Post()
  @UseGuards(AuthGuard)
  public async createNewRole(
    @RequestUser() user: User,
    @Body() body: CreateNewRoleDto,
    @Res() res: Response,
  ) {
    const roleId = await this.roleService.createNewRole(
      body.name,
      user.organization.id,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: `Create role ID: ${roleId} successfully` });
  }

  @Put(':roleId')
  public async editRole(
    @Param('roleId') roleId: number,
    @Body() body: EditRoleDto,
    @Res() res: Response,
  ) {
    await this.roleService.update(roleId, body.name);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Update role info successfully.' });
  }

  @Delete(':roleId')
  public async deleteRole(
    @Param('organizationId') organizationId: number,
    @Param('roleId') roleId: number,
    @Res() res: Response,
  ) {
    await this.roleService.delete(organizationId, roleId);
    return res
      .status(HttpStatus.OK)
      .json({ message: `Delete role ID: ${roleId} successfully` });
  }
}
