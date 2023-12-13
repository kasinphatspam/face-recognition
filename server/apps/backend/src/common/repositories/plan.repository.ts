import { connection } from '@/common/helpers/connection.helper';
import { Plan } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { PlanCreateDto, PlanEditDto } from '@/common/dto/plan.dto';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { PlanInterface } from '@/common/interfaces/plan.interface';

@Injectable()
export class PlanRepository extends Repository<Plan> implements PlanInterface {
  constructor() {
    super(Plan, connection.createEntityManager());
  }
  public async getAllPlan(): Promise<Plan[]> {
    return this.find();
  }

  public async getPlanById(planId: number): Promise<Plan> {
    return this.findOne({ where: { id: planId } });
  }

  public async getPlanByCost(cost: number): Promise<Plan> {
    return this.findOne({ where: { cost: cost } });
  }

  public async createPlan(data: PlanCreateDto): Promise<InsertResult> {
    return this.createQueryBuilder().insert().into(Plan).values(data).execute();
  }

  public async updatePlanById(
    planId: number,
    data: PlanEditDto,
  ): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update(Plan)
      .set(data)
      .where('id = :id', { id: planId })
      .execute();
  }
}
