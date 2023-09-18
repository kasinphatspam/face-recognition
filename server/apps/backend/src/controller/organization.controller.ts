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

  /* 
    Service name:  Get organization by id
    Url: http://localhost:3001/organization/:organizationId/
    Method: GET
    Body: {}
  */
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

  /* 
    Service name:  Create new organization
    Url: http://localhost:3001/organization/user/:userId
    Method: POST
    Body: { "name": "" }
  */
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

  /* 
    Service name:  Update organization Information
    Url: http://localhost:3001/organization/:organizationId
    Method: PUT
    Body: { "name": "", "vtigerToken": "", "vtigerAccessKey": "", "vtigerLink": "", "isPublic": false }
  */
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

  /* 
    Service name:  Delete organization
    Url: http://localhost:3001/organization/:organizationId
    Method: DELETE
    Body: {}
  */
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

  /* 
    Service name:  Join organization with passcode
    Url: http://localhost:3001/organization/user/:userId/join/:passcode
    Method: POST
    Body: {}
  */
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

  /* 
    Service name:  Get organization passcode
    Url: http://localhost:3001/organization/:organizationId/passcode
    Method: POST
    Body: {}
  */
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

  /* 
    Service name:  Generate new passcode (for administator)
    Url: http://localhost:3001/organization/user/:userId/join/:passcode
    Method: POST
    Body: {}
  */
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

  /* 
    Service name:  Get list of employees in the organization
    Url: http://localhost:3001/organization/employee/list/all
    Method: GET
    Body: {}
  */
  @Get(':organizationId/employee/list/all')
  public async getAllEmployee(@Param('organizationId') organizationId: number) {
    return this.employeeService.findAll(organizationId);
  }

  /* 
    Service name:  Delete employee (user account)
    Url: http://localhost:3001/organization/employee/:userId
    Method: GET
    Body: {}
  */
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

  /* 
    Service name:  Get contact by id
    Url: http://localhost:3001/organization/:organizationId/contact/:contactId
    Method: GET
    Body: {}
  */
  @Get(':organizationId/contact/:contactId')
  public async getContactById(
    @Param('organizationId') organizationId: number,
    @Param('contactId') contactId: number,
  ) {
    return this.contactService.getContactById(organizationId, contactId);
  }

  /* 
    Service name:  Create new contact
    Url: http://localhost:3001/organization/:organizationId/contact
    Method: POST
    Body: { "firstname":"", "lastname":"", "contactCompany":"", 
    "title":"", "officePhone":"", "mobile":"", "email1":"", "email2":"", 
    "dob":"", "contactOwner":"", "createdTime":"", "modifiedTime": "",
    "facebook":"", "linkedin":"" }
  */
  @Post(':organizationId/contact')
  public async createNewContact(
    @Param('organizationId') organizationId: number,
    @Body() body: CreateNewContactDto,
  ) {
    return this.contactService.createNewContact(organizationId, body);
  }

  /* 
    Service name:  Encode contact image
    Url: http://localhost:3001/organization/:organizationId/contact/:contactId/encode
    Method: PUT
    Body: { "image": "" }
  */
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

  /* 
    Service name:  Recognition contact image
    Url: http://localhost:3001/organization/:organizationId/contact/encode/recognition
    Method: POST
    Body: { "image": "" }
  */
  @Post(':organizationId/contact/encode/recognition')
  public async recognitionContactImage(
    @Param('organizationId') organizationId: number,
    @Body() body: EncodeContactImageDto,
  ) {
    return this.contactService.recognitionImage(organizationId, body.image);
  }

  /* 
    Service name:  Get all contact
    Url: http://localhost:3001/organization/:organizationId/contact/list/all
    Method: GET
    Body: {}
  */
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

  /* 
    Service name:  Get all roles
    Url: http://localhost:3001/organization/:organizationId/role/list/all
    Method: GET
    Body: {}
  */
  @Get(':organizationId/role/list/all')
  public async getAllRole(@Param('organizationId') organizationId: number) {
    return this.roleService.findAll(organizationId);
  }

  /* 
    Service name:  Create new role
    Url: http://localhost:3001/organization/:organizationId/role
    Method: POST
    Body: {}
  */
  @Post(':organizationId/role')
  public async createNewRole(
    @Param('organizationId') organizationId: number,
    @Body() body: CreateNewRoleDto,
  ) {
    return this.roleService.createNewRole(body.name, organizationId);
  }

  /* 
    Service name:  Edit role
    Url: http://localhost:3001/organization/:organizationId/role/:roleId
    Method: PUT
    Body: {}
  */
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

  /* 
    Service name:  Change employee role
    Url: http://localhost:3001/organization/:organizationId/employee/:userId/role/:roleId
    Method: PUT
    Body: {}
  */
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

  /* 
    Service name:  Edit role permission
    Url: http://localhost:3001/organization/:organizationId/role/:roleId
    Method: PUT
    Body: {}
  */
  @Put(':organizationId/role/permission')
  public async editRolePermission() {
    return;
  }

  /* 
    Service name:  Delete role
    Url: http://localhost:3001/organization/:organizationId/role/:roleId
    Method: DELETE
    Body: {}
  */
  @Delete(':organizationId/role/:roleId')
  public async deleteRole(
    @Param('organizationId') organizationId: number,
    @Param('roleId') roleId: number,
  ) {
    return this.roleService.delete(organizationId, roleId);
  }
}
