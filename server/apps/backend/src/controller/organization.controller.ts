import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { OrganizationService } from "src/service/organization.service";
import { RoleService } from "src/service/role.service";
import { CreateOrganizationDto, DeleteOrganizationDto, GenerateNewPasscodeDto, GetCurrentOrganizationDto, GetOrganizationByIdDto, JoinOrganizationDto, UpdateOrganizationDto } from "src/utils/dtos/organization.dto";
import { CreateNewRoleDto } from "src/utils/dtos/role.dto";

@Controller('organization')
export class OrganizationController {

    constructor(private readonly organizationService: OrganizationService, private readonly roleService: RoleService) { }

    @Get()
    public async getOrganizationById(@Body() body: GetOrganizationByIdDto, @Res() res: Response) {
        const organization = await this.organizationService.getOrganizationById(body)
        return res.status(HttpStatus.OK).json({ organization })
    }

    @Get('me')
    public async getCurrentOrganization(@Body() body: GetCurrentOrganizationDto, @Res() res: Response) {
        const organization = await this.organizationService.getCurrentOrganization(body)
        return res.status(HttpStatus.OK).json({ organization })
    }

    @Post()
    public async create(@Body() body: CreateOrganizationDto, @Res() res: Response) {
        await this.organizationService.create(body)
        return res.status(HttpStatus.OK).json({ msg: `Created organization successfully` })
    }

    @Put()
    public async update(@Body() body: UpdateOrganizationDto, @Res() res: Response) {
        await this.organizationService.update(body)
        return res.status(HttpStatus.OK).json({ msg: `Updated organization successfully` })
    }

    @Delete()
    public async delete(@Body() body: DeleteOrganizationDto, @Res() res: Response) {
        await this.organizationService.delete(body)
        return res.status(HttpStatus.OK).json({ msg: `Deleted organization successfully` })
    }

    @Post('join/:passcode')
    public async join(
        @Body() body: JoinOrganizationDto,
        @Param('passcode') passcode: string,
        @Res() res: Response) {
        const organization = await this.organizationService.join(body, passcode)
        return res.status(HttpStatus.OK).json({ 
            msg: `User id: ${body.userId} joined Organiztion id: ${organization.organizationId} successfully` 
        })
    }

    @Put('passcode')
    public async generateNewPasscode(@Body() body: GenerateNewPasscodeDto, @Res() res: Response) {
        return res.status(HttpStatus.OK).json({
            msg: `Successfully generated a new passcode`, 
            passcode: await this.organizationService.generateNewPasscode(body)
        })
    }

    @Get('employee')
    public async getAllEmployee() {
        return 
    }

    @Delete('employee')
    public async deleteEmployee() {
        return
    }

    @Put('vtiger')
    public async linkWithVtiger() {
        return
    }

    @Post('vtiger')
    public async importDataFromVtiger() {
        return
    }

    @Get('contact')
    public async getContactById() {
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

    @Post('role')
    public async createNewRole(@Body() body: CreateNewRoleDto) {
        return await this.roleService.createNewRole(body.roleName, body.organizationId)
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