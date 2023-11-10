import { connection } from '@/utils/connection';
import { Plan } from '@/entity';
import { Injectable } from '@nestjs/common';
import { PlanCreateDto, PlanEditDto } from '@/utils/dtos/plan.dto';

@Injectable()
export class PlanRepository {
  public async getAllPlan(): Promise<Plan[]> {
    return connection.getRepository(Plan).find();
  }

  public async getPlanById(planId: number): Promise<Plan> {
    return connection.getRepository(Plan).findOne({ where: { id: planId } });
  }

  public async getPlanByCost(cost: number): Promise<Plan> {
    return connection.getRepository(Plan).findOne({ where: { cost: cost } });
  }

  public async createPlan(data: PlanCreateDto) {
    return connection
      .createQueryBuilder()
      .insert()
      .into(Plan)
      .values(data)
      .execute();
  }

  public async updatePlanById(planId: number, data: PlanEditDto) {
    return connection
      .createQueryBuilder()
      .update(Plan)
      .set(data)
      .where('id = :id', { id: planId })
      .execute();
  }
}
