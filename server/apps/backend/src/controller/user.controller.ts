import { Controller, Get, Post, Put, Delete, Body, HttpStatus, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../service/user.service';
import { UpdateUserImageDto, UpdateUserDto } from 'src/utils/dtos/user.dto';
import { OrganizationService } from 'src/service/organization.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly organizationService: OrganizationService
    ) { }

    @Get('list/all')
    public getAllUser() {
        return this.userService.getAllUser()
    }

    @Get(':userId')
    public getUserById(@Param('userId') userId: number) {
        return this.userService.getUserById(userId)
    }

    @Put(':userId')
    public async update(
        @Param('userId') userId: number,
        @Body() body: UpdateUserDto,
        @Res() res: Response) {
        await this.userService.updateUserInfo(userId, body)
        return res.status(HttpStatus.OK).json({
        message: "Update user information successfully"
        })
    }

    @Put(':userId/image')
    public async updateUserImage(
        @Param('userId') userId: number,
        @Body() body: UpdateUserImageDto,
        @Res() res: Response) {
        await this.userService.updateImage(userId, body)
        return res.status(HttpStatus.OK).json({
        message: "Update user image successfully"
        })
    }

    @Delete(':userId')
    public async delete(
        @Param('userId') userId: number,
        @Res() res: Response) {
        await this.userService.deleteUserAccount(userId)
        return res.status(HttpStatus.OK).json({
        message: "Delete user account successfully"
        })
    }

    @Get(':userId/organization')
    public async getCurrentOrganization(
        @Param('userId') userId: number, 
        @Res() res: Response) {
        const organization = await this.organizationService.getCurrentOrganization(userId)
        return res.status(HttpStatus.OK).json({ organization })
    }

}