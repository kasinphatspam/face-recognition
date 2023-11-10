import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '@/entity';
import { Request } from 'express';

type Params = {
  userId: number | undefined;
};

@Injectable()
export class SelfGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest<Request>();
    const { userId } = params as unknown as Params;

    return (user as User).id === userId;
  }
}
