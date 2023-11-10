import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ContactService } from '@/service/contact.service';
import { EmployeeService } from '@/service/employee.service';
import { OrganizationService } from '@/service/organization.service';
import { RoleService } from '@/service/role.service';
import {
  CreateNewContactDto,
  EncodeContactImageDto,
} from '@/utils/dtos/contact.dto';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/utils/dtos/organization.dto';
import { CreateNewRoleDto, EditRoleDto } from '@/utils/dtos/role.dto';
import { AuthGuard } from '@/utils/guards/auth.guard';
@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly roleService: RoleService,
    private readonly employeeService: EmployeeService,
    private readonly contactService: ContactService,
  ) {}

  @Get(':organizationId')
  @UseGuards(AuthGuard)
  public async getOrganizationById(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    const organization = await this.organizationService.getOrganizationById(
      organizationId,
    );

    return res.status(HttpStatus.OK).json(organization);
  }

  @Post('/user/:userId')
  @UseGuards(AuthGuard)
  public async createNewOrganization(
    @Param('userId') userId: number,
    @Body() body: CreateOrganizationDto,
    @Res() res: Response,
  ) {
    await this.organizationService.createNewOraganization(userId, body);
    return res.status(HttpStatus.OK).json({
      message: `Created organization successfully`,
    });
  }

  @Put(':organizationId')
  public async updateOrganizationInfo(
    @Param('organizationId') organizationId: number,
    @Body() body: UpdateOrganizationDto,
    @Res() res: Response,
  ) {
    await this.organizationService.update(organizationId, body);
    return res.status(HttpStatus.OK).json({
      message: `Updated organization successfully`,
    });
  }

  @Delete(':organizationId')
  public async deleteOrganization(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    await this.organizationService.deleteOrganization(organizationId);
    return res.status(HttpStatus.OK).json({
      message: `Deleted organization successfully`,
    });
  }

  @Post('user/:userId/join/:passcode')
  public async joinOrganizationWithPasscode(
    @Param('userId') userId: number,
    @Param('passcode') passcode: string,
    @Res() res: Response,
  ) {
    const organization =
      await this.organizationService.joinOrganizationWithPasscode(
        userId,
        passcode,
      );
    return res.status(HttpStatus.OK).json({
      message: `User id: ${userId} joined Organiztion id: ${organization.id} successfully`,
      organization,
    });
  }

  @Put(':organizationId/passcode')
  public async generateNewPasscode(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.OK).json({
      message: `Successfully generated a new passcode`,
      passcode: await this.organizationService.generateNewPasscode(
        organizationId,
      ),
    });
  }

  @Get(':organizationId/employee/list/all')
  public async getAllEmployee(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    const users = await this.employeeService.findAll(organizationId);
    return res.status(HttpStatus.OK).json(users);
  }

  @Delete(':organizationId/employee/:userId')
  public async deleteEmployee(
    @Param('organizationId') organizationId: number,
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    await this.employeeService.delete(organizationId, userId);
    return res.status(HttpStatus.OK).json({
      message: `Successfully deleted employee id ${userId} from organization id: ${organizationId}`,
    });
  }

  @Put(':organizationId/vtiger')
  public async linkWithVtiger(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.OK).json(organizationId);
  }

  @Post(':organizationId/vtiger')
  public async importDataFromVtiger(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.OK).json(organizationId);
  }

  @Get(':organizationId/contact/:contactId')
  public async getContactById(
    @Param('organizationId') organizationId: number,
    @Param('contactId') contactId: number,
    @Res() res: Response,
  ) {
    const contact = await this.contactService.getContactById(
      organizationId,
      contactId,
    );

    return res.status(HttpStatus.OK).json(contact);
  }

  @Post(':organizationId/contact')
  public async createNewContact(
    @Param('organizationId') organizationId: number,
    @Body() body: CreateNewContactDto,
    @Res() res: Response,
  ) {
    const contactId = await this.contactService.createNewContact(
      organizationId,
      body,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: `Create contact ID: ${contactId} successfully` });
  }

  @Put(':organizationId/contact/:contactId/encode')
  public async encodeContactImage(
    @Param('organizationId') organizationId: number,
    @Param('contactId') contactId: number,
    @Body() body: EncodeContactImageDto,
    @Res() res: Response,
  ) {
    console.log('***********');
    const encodedId = await this.contactService.encodeImage(
      organizationId,
      contactId,
      body.image,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'encode image successfully', encodedId: encodedId });
  }

  @Post(':organizationId/user/:userId/contact/encode/recognition')
  public async recognitionContactImage(
    @Param('organizationId') organizationId: number,
    @Param('userId') userId: number,
    @Body() body: EncodeContactImageDto,
    @Res() res: Response,
  ) {
    const data = await this.contactService.recognitionImage(
      organizationId,
      userId,
      body.image,
    );

    return res.status(HttpStatus.OK).json(data);
  }

  @Get(':organizationId/contact/list/all')
  public async getAllContact(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    const contacts = await this.contactService.getAllContact(organizationId);
    return res.status(HttpStatus.OK).json(contacts);
  }

  @Post(':organizationId/contact/import/excel')
  public async importContactFromCSV(@Res() res: Response) {
    const csv = await this.contactService.importFromCSV();
    return res.status(HttpStatus.OK).json(csv);
  }

  @Post(':organizationId/contact/import/vtiger')
  public async importContactFromVtigerAPI(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({});
  }

  @Get(':organizationId/role/list/all')
  public async getAllRole(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    const roles = await this.roleService.findAll(organizationId);
    return res.status(HttpStatus.OK).json(roles);
  }

  @Post(':organizationId/role')
  public async createNewRole(
    @Param('organizationId') organizationId: number,
    @Body() body: CreateNewRoleDto,
    @Res() res: Response,
  ) {
    const roleId = await this.roleService.createNewRole(
      body.name,
      organizationId,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: `Create role ID: ${roleId} successfully` });
  }

  @Put(':organizationId/role/:roleId')
  public async editRole(
    @Param('organizationId') organizationId: number,
    @Param('roleId') roleId: number,
    @Body() body: EditRoleDto,
    @Res() res: Response,
  ) {
    await this.roleService.update(roleId, body.name, organizationId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Update role info successfully.' });
  }

  @Put(':organizationId/employee/:userId/role/:roleId')
  public async changeEmployeeRole(
    @Param('organizationId') organizationId: number,
    @Param('roleId') roleId: number,
    @Param('userId') userId: number,
    @Res() res: Response,
  ) {
    await this.roleService.changeEmployeeRole(organizationId, roleId, userId);
    res.status(HttpStatus.OK).json({
      message: `Change role of user id: ${userId} to role id: ${roleId} successfully.`,
    });
  }

  @Put(':organizationId/role/permission')
  public async editRolePermission(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({});
  }

  @Delete(':organizationId/role/:roleId')
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
