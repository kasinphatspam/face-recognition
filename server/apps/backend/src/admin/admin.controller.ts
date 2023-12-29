import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/common/guards/auth.guard';
import { Response } from 'express';
import { GodGuard } from '@/common/guards/god.guard';
import { OrganizationService } from '@/organizations/services/organization.service';
import { CreateOrganizationDto } from '@/common/dto/organization.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('organizations')
  @UseGuards(AuthGuard, GodGuard)
  public async getAllOrganizations(@Res() res: Response) {
    const organizations = await this.organizationService.getAllOrganizations();
    return res.status(HttpStatus.OK).json(organizations);
  }

  @Post('organizations')
  @UseGuards(AuthGuard, GodGuard)
  public async createOrganization(
    @Res() res: Response,
    @Body() body: CreateOrganizationDto,
  ) {
    const passcode = await this.organizationService.adminCreateOrganization(
      body,
    );
    return res.status(HttpStatus.CREATED).json({
      message: 'Create organization successfully',
      passcode: passcode,
    });
  }
}
