import {
  Controller,
  Get,
  Put,
  Body,
  HttpStatus,
  Res,
  Param,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { PlanService } from '@/service/plan.service';
import { PlanCreateDto, PlanEditDto } from '@/utils/dtos/plan.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  public async findAll(@Res() res: Response) {
    const plans = await this.planService.getAllPlan();
    return res.status(HttpStatus.OK).json(plans);
  }

  @Get(':planId')
  public async getPlanById(
    @Param('planId') planId: number,
    @Res() res: Response,
  ) {
    const plan = await this.planService.getPlanById(planId);
    return res.status(HttpStatus.OK).json(plan);
  }

  @Post()
  public async createNewPlan(
    @Body() body: PlanCreateDto,
    @Res() res: Response,
  ) {
    const planId = await this.planService.createNewPlan(body);
    return res
      .status(HttpStatus.OK)
      .json({ message: `Create plan ID: ${planId} successfully` });
  }

  @Put(':planId')
  public async updatePlanById(
    @Body() body: PlanEditDto,
    @Param('planId') planId: number,
    @Res() res: Response,
  ) {
    await this.planService.updatePlanById(planId, body);
    return res
      .status(HttpStatus.OK)
      .json({ message: `Update plan ID: ${planId} successfully` });
  }
}
