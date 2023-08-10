import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { EmployeeService } from "src/service/employee.service";
import { OrganizationService } from "src/service/organization.service";
import { RoleService } from "src/service/role.service";
import { CreateOrganizationDto, UpdateOrganizationDto } from "src/utils/dtos/organization.dto";
import { CreateNewRoleDto } from "src/utils/dtos/role.dto";

@Controller('organization')
export class OrganizationController {

    constructor(
        private readonly organizationService: OrganizationService,
        private readonly roleService: RoleService,
        private readonly employeeService: EmployeeService
    ) { }

    @Get(':organizationId')
    public async getOrganizationById(
        @Param('organizationId') organizationId: number,
        @Res() res: Response) {
        const organization = await this.organizationService.getOrganizationById(organizationId)
        return res.status(HttpStatus.OK).json({ organization })
    }

    @Post(':userId')
    public async create(
        @Param('userId') userId: number,
        @Body() body: CreateOrganizationDto,
        @Res() res: Response) {
        await this.organizationService.createNewOraganization(userId, body)
        return res.status(HttpStatus.OK).json({
            message: `Created organization successfully`
        })
    }

    @Put(':organizationId')
    public async update(
        @Param('organizationId') organizationId: number,
        @Body() body: UpdateOrganizationDto,
        @Res() res: Response) {
        await this.organizationService.updateOrganizationInfo(organizationId, body)
        return res.status(HttpStatus.OK).json({
            message: `Updated organization successfully`
        })
    }

    @Delete(':organizationId')
    public async delete(
        @Param('organizationId') organizationId: number,
        @Res() res: Response) {
        await this.organizationService.deleteOrganization(organizationId)
        return res.status(HttpStatus.OK).json({
            message: `Deleted organization successfully`
        })
    }

    @Post('user/:userId/join/:passcode')
    public async join(
        @Param('userId') userId: number,
        @Param('passcode') passcode: string,
        @Res() res: Response) {
        const organization = await this.organizationService.joinOrganizationWithPasscode(userId, passcode)
        return res.status(HttpStatus.OK).json({
            message: `User id: ${userId} joined Organiztion id: ${organization.organizationId} successfully`
        })
    }

    @Put(':organizationId/passcode')
    public async generateNewPasscode(
        @Param('organizationId') organizationId: number,
        @Res() res: Response) {
        return res.status(HttpStatus.OK).json({
            message: `Successfully generated a new passcode`,
            passcode: await this.organizationService.generateNewPasscode(organizationId)
        })
    }

    @Get(':organizationId/employee')
    public async getAllEmployee(
        @Param('organiztionId') organizationId: number
    ) {
        return await this.employeeService.getAllEmployee(organizationId)
    }

    @Delete(':organizationId/employee/:userId')
    public async deleteEmployee(
        @Param('organizationId') organizationId: number,
        @Param('userId') userId: number,
        @Res() res: Response
    ) {
        await this.employeeService.deleteEmployee(organizationId, userId)
        return res.status(HttpStatus.OK).json({
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

    @Get('contact/:contactId')
    public async getContactById(
        @Param('contactId') contactId: number
    ) {
        return
    }

    @Get('contact/all')
    public async getAllContact() {
        return
    }

    @Get('role')
    public async getListOfRoleById() {
        return
    }

    @Post(':organizationId/role')
    public async createNewRole(
        @Param('organizationId') organizationId: number,
        @Body() body: CreateNewRoleDto) {
        return await this.roleService.createNewRole(body.roleName, organizationId)
    }

    @Put('role')
    public async editRole() {
        return
    }

    @Put('role/permission')
    public async editRolePermission() {
        return
    }

    @Delete('role')
    public async deleteRole() {
        return
    }

}