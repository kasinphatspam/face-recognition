import { connection } from '@/utils/connection';
import { Plan } from '@/entity';
import { Injectable } from '@nestjs/common';
import { PlanCreateDto, PlanEditDto } from '@/utils/dtos/plan.dto';

/**
 * PlanRepository
 * This class is responsible for interacting with a MySQL database using TypeORM.
 * It provides methods for retrieving, creating, and updating plans.
 */
@Injectable()
export class PlanRepository {
  /**
   * Retrieve all plans from the database.
   * @returns A promise that resolves to an array of Plan entities.
   */
  public async getAllPlan(): Promise<Plan[]> {
    return connection.getRepository(Plan).find();
  }

  /**
   * Retrieve a plan by its ID.
   * @param planId - The ID of the plan to retrieve.
   * @returns A promise that resolves to a Plan entity.
   */
  public async getPlanById(planId: number): Promise<Plan> {
    return connection.getRepository(Plan).findOne({ where: { id: planId } });
  }

  /**
   * Retrieve a plan by its cost.
   * @param cost - The cost of the plan to retrieve.
   * @returns A promise that resolves to a Plan entity.
   */
  public async getPlanByCost(cost: number): Promise<Plan> {
    return connection.getRepository(Plan).findOne({ where: { cost: cost } });
  }

  /**
   * Create a new plan.
   * @param data - The data for the new plan.
   * @returns A promise that resolves once the plan is created.
   */
  public async createPlan(data: PlanCreateDto) {
    return connection
      .createQueryBuilder()
      .insert()
      .into(Plan)
      .values(data)
      .execute();
  }

  /**
   * Update a plan by its ID.
   * @param planId - The ID of the plan to update.
   * @param data - The data to update in the plan entity.
   * @returns A promise that resolves once the plan is updated.
   */
  public async updatePlanById(planId: number, data: PlanEditDto) {
    return connection
      .createQueryBuilder()
      .update(Plan)
      .set(data)
      .where('id = :id', { id: planId })
      .execute();
  }
}
