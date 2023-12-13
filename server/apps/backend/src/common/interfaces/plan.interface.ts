import { Plan } from '@/common/entities';
import { PlanCreateDto, PlanEditDto } from '../dto/plan.dto';
import { InsertResult, UpdateResult } from 'typeorm';

interface PlanInterface {
  getAllPlan(): Promise<Plan[]>;
  getPlanById(planId: number): Promise<Plan>;
  getPlanByCost(cost: number): Promise<Plan>;
  createPlan(data: PlanCreateDto): Promise<InsertResult>;
  updatePlanById(planId: number, data: PlanEditDto): Promise<UpdateResult>;
}

export { PlanInterface };
