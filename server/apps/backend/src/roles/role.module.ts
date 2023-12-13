import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '@/common/entities';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/users/user.module';
import { RoleController } from './role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    AuthModule,
    forwardRef(() => UserModule),
  ],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
  controllers: [RoleController],
})
export class RoleModule {}
