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
import { OrganizationService } from '@/organizations/services/organization.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@/common/dto/organization.dto';
import { AuthGuard } from '@/common/guards/auth.guard';
import { RequestUser } from '@/common/decorators/auth.decorator';
import { User } from '@/common/entities';
import { ApiTags } from '@nestjs/swagger';

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
  @UseGuards(AuthGuard)
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
      message: `User id: ${user.id} joined organization id: ${organization.id} successfully`,
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
