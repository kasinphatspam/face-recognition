import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '@/users/user.repository';
import { RoleRepository } from '@/roles/role.repository';
import { PlanRepository } from '@/common/repositories/plan.repository';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly planRepository: PlanRepository,
  ) {}

  public async onModuleInit() {
    await this.initializeRole();
    await this.initializeAdmin();
    await this.initializePlan();
  }

  private async initializeRole() {
    const role = await this.roleRepository.findOne({
      where: { name: 'god' },
    });

    if (!role) {
      const godRole = this.roleRepository.create({
        name: 'god',
      });

      await this.roleRepository.save(godRole);
    }
  }

  private async initializeAdmin() {
    const adminExists = await this.userRepository.findOne({
      where: { role: { name: 'god' } },
    });

    if (!adminExists) {
      const role = await this.roleRepository.findOne({
        where: { name: 'god' },
      });

      const adminUser = this.userRepository.create({
        firstname: 'Faceprove',
        lastname: 'Admin',
        email: 'admin@faceprove.com',
        password:
          '$2b$12$pWo/adieN6Y06.dziHtLCu9oMmKULA/tVQW.SQdTNd2GqSzgPGDXq',
        personalId: '0000000000000',
        role: role,
      });

      await this.userRepository.save(adminUser);
    }
  }

  private async initializePlan() {
    const plans = await this.planRepository.find();
    const costs = [0, 480, 900, 1500];

    if (!plans.find((p) => p.cost === costs[0])) {
      const plan = this.planRepository.create({
        title: 'Free package',
        cost: costs[0],
        limitEmployee: 1,
        limitContact: 50,
      });

      await this.planRepository.save(plan);
    }

    if (!plans.find((p) => p.cost === costs[1])) {
      const plan = this.planRepository.create({
        title: 'Start pack',
        cost: costs[1],
        limitEmployee: 5,
        limitContact: 500,
      });

      await this.planRepository.save(plan);
    }

    if (!plans.find((p) => p.cost === costs[2])) {
      const plan = this.planRepository.create({
        title: 'Smart pack',
        cost: costs[2],
        limitEmployee: 15,
        limitContact: 1500,
      });

      await this.planRepository.save(plan);
    }

    if (!plans.find((p) => p.cost === costs[3])) {
      const plan = this.planRepository.create({
        title: 'Professional pack',
        cost: costs[3],
        limitEmployee: 40,
        limitContact: 4500,
      });

      await this.planRepository.save(plan);
    }
  }
}
