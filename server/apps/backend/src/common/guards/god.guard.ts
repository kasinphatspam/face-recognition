import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotAcceptableException,
} from '@nestjs/common';
import { User } from '@/common/entities';
import { Request } from 'express';

@Injectable()
export class GodGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user: userRequest } = context.switchToHttp().getRequest<Request>();

    const user = userRequest as User;

    if (!user.role || user.role.name !== 'god') {
      throw new NotAcceptableException('permission denied');
    }

    return true;
  }
}
