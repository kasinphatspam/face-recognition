import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { RequestUser } from '@/utils/decorators/auth.decorator';
import { User } from '@/entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('organization')
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

  @Post()
  @UseGuards(AuthGuard)
  public async createNewOrganization(
    @RequestUser() user: User,
    @Body() body: CreateOrganizationDto,
    @Res() res: Response,
  ) {
    await this.organizationService.createNewOraganization(user.id, body);
    return res.status(HttpStatus.OK).json({
      message: `Created organization successfully`,
    });
  }

  @Put()
  @UseGuards(AuthGuard)
  public async updateOrganizationInfo(
    @RequestUser() user: User,
    @Body() body: UpdateOrganizationDto,
    @Res() res: Response,
  ) {
    await this.organizationService.update(user, body);
    return res.status(HttpStatus.OK).json({
      message: `Updated organization successfully`,
    });
  }

  @Delete()
  @UseGuards(AuthGuard)
  public async deleteOrganization(
    @RequestUser() user: User,
    @Res() res: Response,
  ) {
    await this.organizationService.deleteOrganization(user.organization);
    return res.status(HttpStatus.OK).json({
      message: `Deleted organization successfully`,
    });
  }

  @Post('join/:passcode')
  @UseGuards(AuthGuard)
  public async joinOrganizationWithPasscode(
    @RequestUser() user: User,
    @Param('passcode') passcode: string,
    @Res() res: Response,
  ) {
    const organization =
      await this.organizationService.joinOrganizationWithPasscode(
        user.id,
        passcode,
      );
    return res.status(HttpStatus.OK).json({
      message: `User id: ${user.id} joined Organiztion id: ${organization.id} successfully`,
      organization,
    });
  }

  @Put(':organizationId/passcode')
  @UseGuards(AuthGuard)
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

  @Get(':organizationId/employee/all')
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
  @UseGuards(AuthGuard)
  public async linkWithVtiger(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.OK).json(organizationId);
  }

  @Post(':organizationId/vtiger')
  @UseGuards(AuthGuard)
  public async importDataFromVtiger(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.OK).json(organizationId);
  }

  @Get(':organizationId/contact/all')
  public async getAllContact(
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    const contacts = await this.contactService.getAllContact(organizationId);
    return res.status(HttpStatus.OK).json(contacts);
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
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  public async encodeContactImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 10e6 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Param('organizationId') organizationId: number,
    @Param('contactId') contactId: number,
    @Body() body: EncodeContactImageDto,
    @Res() res: Response,
  ) {
    const encodedId = await this.contactService.encodeImage(
      organizationId,
      contactId,
      body.image,
      file,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'encode image successfully', encodedId: encodedId });
  }

  @Post(':organizationId/contact/encode/recognition')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  public async recognitionContactImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 10e6 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Param('organizationId') organizationId: number,
    @RequestUser() user: User,
    @Body() body: EncodeContactImageDto,
    @Res() res: Response,
  ) {
    const data = await this.contactService.recognitionImage(
      organizationId,
      user.id,
      body.image,
      file,
    );

    return res.status(HttpStatus.OK).json(data);
  }

  @Post(':organizationId/contact/csv')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('csv'))
  public async readCSV(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'csv' })],
      }),
    )
    file: Express.Multer.File,
    @Param('organizationId') organizationId: number,
    @Res() res: Response,
  ) {
    const data = await this.contactService.importFromCSV(file, organizationId);
    return res.status(HttpStatus.OK).json({
      message: 'Add data from CSV file successfully',
      data,
    });
  }

  @Post(':organizationId/contact/import/vtiger')
  public async importContactFromVtigerAPI(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({});
  }

  @Delete(':organizationId/contact/:contactId')
  @UseGuards(AuthGuard)
  public async deleteContactById(
    @Param('organizationId') organizationId: number,
    @Param('contactId') contactId: number,
    @Res() res: Response,
  ) {
    await this.contactService.deleteContact(organizationId, contactId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Delete contact successfully' });
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
