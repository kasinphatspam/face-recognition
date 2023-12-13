import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanRepository } from '@/common/repositories/plan.repository';
import { PlanCreateDto, PlanEditDto } from '@/common/dto/plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  public async createNewPlan(body: PlanCreateDto): Promise<number> {
    const result = await this.planRepository.createPlan(body);
    return result.raw.insertId;
  }

  public async getAllPlan() {
    return this.planRepository.getAllPlan();
  }

  public async getPlanById(planId: number) {
    const plan = await this.planRepository.getPlanById(planId);
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    return plan;
  }

  public async getPlanByCost(cost: number) {
    const plan = await this.planRepository.getPlanByCost(cost);
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    return plan;
  }

  public async updatePlanById(planId: number, body: PlanEditDto) {
    return this.planRepository.updatePlanById(planId, body);
  }
}
