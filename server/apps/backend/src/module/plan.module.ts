import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/entity';
import { AuthModule } from '@/module/auth.module';
import { PlanController } from '@/controller/plan.controller';
import { PlanService } from '@/service/plan.service';
import { PlanRepository } from '@/repositories/plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule],
  providers: [PlanService, PlanRepository],
  controllers: [PlanController],
})
export class PlanModule {}
