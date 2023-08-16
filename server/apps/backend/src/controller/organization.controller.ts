import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { ContactService } from "src/service/contact.service";
import { EmployeeService } from "src/service/employee.service";
import { OrganizationService } from "src/service/organization.service";
import { RoleService } from "src/service/role.service";
import { CreateNewContactDto, EncodeContactImageDto } from "src/utils/dtos/contact.dto";
import { CreateOrganizationDto, UpdateOrganizationDto } from "src/utils/dtos/organization.dto";
import { CreateNewRoleDto, EditRoleDto } from "src/utils/dtos/role.dto";

@Controller('organization')
export class OrganizationController {

    constructor(
        private readonly organizationService: OrganizationService,
        private readonly roleService: RoleService,
        private readonly employeeService: EmployeeService,
        private readonly contactService: ContactService
    ) { }

    @Get(':organizationId')
    public async getOrganizationById(
        @Param('organizationId') organizationId: number,
        @Res() res: Response) {
        const organization = await this.organizationService
            .getOrganizationById(organizationId)
        return res.status(HttpStatus.OK)
            .json({ organization })
    }

    @Post(':userId')
    public async create(
        @Param('userId') userId: number,
        @Body() body: CreateOrganizationDto,
        @Res() res: Response) {
        await this.organizationService
            .createNewOraganization(userId, body)
        return res.status(HttpStatus.OK)
            .json({
                message: `Created organization successfully`
            })
    }

    @Put(':organizationId')
    public async update(
        @Param('organizationId') organizationId: number,
        @Body() body: UpdateOrganizationDto,
        @Res() res: Response) {
        await this.organizationService
            .updateOrganizationInfo(organizationId, body)
        return res.status(HttpStatus.OK)
            .json({
                message: `Updated organization successfully`
            })
    }

    @Delete(':organizationId')
    public async delete(
        @Param('organizationId') organizationId: number,
        @Res() res: Response) {
        await this.organizationService
            .deleteOrganization(organizationId)
        return res.status(HttpStatus.OK)
            .json({
                message: `Deleted organization successfully`
            })
    }

    @Post('user/:userId/join/:passcode')
    public async join(
        @Param('userId') userId: number,
        @Param('passcode') passcode: string,
        @Res() res: Response) {
        const organization = await this.organizationService
            .joinOrganizationWithPasscode(userId, passcode)
        return res
            .status(HttpStatus.OK)
            .json({
                message: `User id: ${userId} joined Organiztion id: ${organization.organizationId} successfully`,
                organization
            })
    }

    @Put(':organizationId/passcode')
    public async generateNewPasscode(
        @Param('organizationId') organizationId: number,
        @Res() res: Response) {
        return res.status(HttpStatus.OK).json({
            message: `Successfully generated a new passcode`,
            passcode: await this.organizationService
                .generateNewPasscode(organizationId)
        })
    }

    @Get(':organizationId/employee/list/all')
    public async getAllEmployee(
        @Param('organizationId') organizationId: number
    ) {
        return await this.employeeService
            .getAllEmployee(organizationId)
    }

    @Delete(':organizationId/employee/:userId')
    public async deleteEmployee(
        @Param('organizationId') organizationId: number,
        @Param('userId') userId: number,
        @Res() res: Response
    ) {
        await this.employeeService
            .deleteEmployee(organizationId, userId)
        return res.status(HttpStatus.OK)
            .json({
                message: `Successfully deleted employee id ${userId} from organization id: ${organizationId}`
            })
    }

    @Put(':organizationId/vtiger')
    public async linkWithVtiger(
        @Param('organizationId') organizationId: number
    ) {
        return
    }

    @Post(':organizationId/vtiger')
    public async importDataFromVtiger(
        @Param('organizationId') organizationId: number
    ) {
        return
    }

    @Get(':organizationId/contact/:contactId')
    public async getContactById(
        @Param('organizationId') organizationId: number,
        @Param('contactId') contactId: number
    ) {
        return await this.contactService.getContactById(organizationId, contactId)
    }

    @Post(':organizationId/contact')
    public async createNewContact(
        @Param('organizationId') organizationId: number,
        @Body() body: CreateNewContactDto
    ) {
        return await this.contactService.createNewContact(organizationId, body)
    }

    @Put(':organizationId/contact/:contactId/encode')
    public async encodeContactImage(
        @Param('organizationId') organizationId: number,
        @Param('contactId') contactId: number,
        @Body() body: EncodeContactImageDto,
        @Res() res: Response
    ) {
        const encodedId = await this.contactService.encodeImage(organizationId, contactId, body.imageBase64)
        return res.status(HttpStatus.OK).json({ message: "encode image successfully", encodedId: encodedId })
    }

    @Post(':organizationId/contact/encode/recognition')
    public async recognitionContactImage(
        @Param('organizationId') organizationId: number,
        @Body() body: EncodeContactImageDto
    ) {
        return await this.contactService.recognitionImage(organizationId, body.imageBase64)
    }

    @Get(':organizationId/contact/list/all')
    public async getAllContact(
        @Param('organizationId') organizationId: number
    ) {
        return await this.contactService.getAllContact(organizationId)
    }

    @Get(':organizationId/role/list/all')
    public async getAllRole(
        @Param('organizationId') organizationId: number
    ) {
        return await this.roleService.getAllRole(organizationId)
    }

    @Post(':organizationId/role')
    public async createNewRole(
        @Param('organizationId') organizationId: number,
        @Body() body: CreateNewRoleDto) {
        return await this.roleService
            .createNewRole(body.roleName, organizationId)
    }

    @Put(':organizationId/role/:roleId')
    public async editRole(
        @Param('organizationId') organizationId: number,
        @Param('roleId') roleId: number,
        @Body() body: EditRoleDto
    ) {
        return await this.roleService
            .editRole(roleId, body.roleName, organizationId)
    }

    @Put(':organizationId/role/permission')
    public async editRolePermission() {
        return
    }

    @Delete(':organizationId/role/:roleId')
    public async deleteRole(
        @Param('organizationId') organizationId: number,
        @Param('roleId') roleId: number
    ) {
        return this.roleService.deleteRole(organizationId,roleId)
    }

}