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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { OrganizationService } from '@/organizations/services/organization.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/common/dto/organization.dto';
import { AuthGuard } from '@/common/guards/auth.guard';
import { RequestUser } from '@/common/decorators/auth.decorator';
import { User } from '@/common/entities';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@/common/guards/admin.guard';

@ApiTags('Organizations')
@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

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

  @Put()
  @UseGuards(AuthGuard, AdminGuard)
  public async updateOrganizationInfo(
    @RequestUser() user: User,
    @Body() body: UpdateOrganizationDto,
    @Res() res: Response,
  ) {
    await this.organizationService.update(user.organization, body);
    return res.status(HttpStatus.OK).json({
      message: `Updated organization successfully`,
    });
  }

  @Delete()
  @UseGuards(AuthGuard, AdminGuard)
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
    const response = await this.organizationService.joinWithPasscode(
      user,
      passcode,
    );
    const organization = response.organization;
    if (response.type == 0) {
      return res.status(HttpStatus.OK).json({
        message: `User with ID ${user.id} successfully sent the join request to Organization with ID ${organization.id}`,
      });
    }
    return res.status(HttpStatus.OK).json({
      message: `User with ID ${user.id} successfully join to Organization :with ID ${organization.id}`,
      organization,
    });
  }

  @Get('info/requests')
  @UseGuards(AuthGuard, AdminGuard)
  public async getAllRequest(@RequestUser() user: User, @Res() res: Response) {
    const requests = await this.organizationService.getAllRequest(user);
    return res.status(HttpStatus.OK).json({
      requests: requests,
    });
  }

  @Post('info/requests/:requestId/:reply')
  @UseGuards(AuthGuard, AdminGuard)
  public async responseRequest(
    @Param('requestId') requestId: number,
    @Param('reply') reply: string,
    @Res() res: Response,
  ) {
    if (reply === 'accept') {
      await this.organizationService.acceptRequest(requestId);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Accept request successfully' });
    } else if (reply === 'reject') {
      await this.organizationService.rejectRequest(requestId);
      return res.status(HttpStatus.NO_CONTENT).json();
    } else {
      throw new BadRequestException('Incorrect input in the reply parameters');
    }
  }

  @Delete('info/requests/reject/all')
  @UseGuards(AuthGuard, AdminGuard)
  public async rejectAllRequest(
    @RequestUser() user: User,
    @Res() res: Response,
  ) {
    await this.organizationService.rejectAllRequest(user.organization.id);
    return res.status(HttpStatus.NO_CONTENT).json();
  }

  @Put(':organizationId/passcode')
  @UseGuards(AuthGuard, AdminGuard)
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
}
