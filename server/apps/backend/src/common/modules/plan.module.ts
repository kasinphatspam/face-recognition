import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/common/entities';
import { AuthModule } from '@/auth/auth.module';
import { PlanController } from '@/common/controllers/plan.controller';
import { PlanService } from '@/common/services/plan.service';
import { PlanRepository } from '@/common/repositories/plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule],
  providers: [PlanService, PlanRepository],
  controllers: [PlanController],
})
export class PlanModule {}
