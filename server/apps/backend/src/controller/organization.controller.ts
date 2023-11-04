import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
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

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly roleService: RoleService,
    private readonly employeeService: EmployeeService,
    private readonly contactService: ContactService,
  ) {}

  @Get(':organizationId')
  public async getOrganizationById(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    const organization = await this.organizationService.getOrganizationById(
      organizationId,
    );
    if (!organization) {
      throw new BadRequestException('Not found organization.');
    }
    return res.status(HttpStatus.OK).json({ organization });
  }

  @Post('/user/:userId')
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

  @Get(':organizationId/passcode')
  public async getOrganizationPasscode(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    const organization = await this.organizationService.getOrganizationById(
      organizationId,
    );

    if (!organization) {
      throw new BadRequestException('Not found organization.');
    }
    return res.status(HttpStatus.OK).json({ passcode: organization.passcode });
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
  public async getAllEmployee(@Param('organizationId') organizationId: number) {
    return this.employeeService.findAll(organizationId);
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
  public async linkWithVtiger(@Param('organizationId') organizationId: number) {
    return organizationId;
  }

  @Post(':organizationId/vtiger')
  public async importDataFromVtiger(
    @Param('organizationId') organizationId: number,
  ) {
    return organizationId;
  }

  @Get(':organizationId/contact/:contactId')
  public async getContactById(
    @Param('organizationId') organizationId: number,
    @Param('contactId') contactId: number,
  ) {
    return this.contactService.getContactById(organizationId, contactId);
  }

  @Post(':organizationId/contact')
  public async createNewContact(
    @Param('organizationId') organizationId: number,
    @Body() body: CreateNewContactDto,
  ) {
    return this.contactService.createNewContact(organizationId, body);
  }

  @Put(':organizationId/contact/:contactId/encode')
  public async encodeContactImage(
    @Param('organizationId') organizationId: number,
    @Param('contactId') contactId: number,
    @Body() body: EncodeContactImageDto,
    @Res() res: Response,
  ) {
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
  ) {
    return this.contactService.recognitionImage(
      organizationId,
      userId,
      body.image,
    );
  }

  @Get(':organizationId/contact/list/all')
  public async getAllContact(@Param('organizationId') organizationId: number) {
    return this.contactService.getAllContact(organizationId);
  }

  @Post(':organizationId/contact/import/excel')
  public async importContactFromCSV() {
    return this.contactService.importFromCSV();
  }

  @Post(':organizationId/contact/import/vtiger')
  public async importContactFromVtigerAPI() {
    return;
  }

  @Get(':organizationId/role/list/all')
  public async getAllRole(@Param('organizationId') organizationId: number) {
    return this.roleService.findAll(organizationId);
  }

  @Post(':organizationId/role')
  public async createNewRole(
    @Param('organizationId') organizationId: number,
    @Body() body: CreateNewRoleDto,
  ) {
    return this.roleService.createNewRole(body.name, organizationId);
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
  public async editRolePermission() {
    return;
  }

  @Delete(':organizationId/role/:roleId')
  public async deleteRole(
    @Param('organizationId') organizationId: number,
    @Param('roleId') roleId: number,
  ) {
    return this.roleService.delete(organizationId, roleId);
  }
}
