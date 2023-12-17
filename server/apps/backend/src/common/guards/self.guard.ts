import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { User } from '@/common/entities';
import { Request } from 'express';

type Params = {
  userId: number | undefined;
};

@Injectable()
export class SelfGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest<Request>();
    const { userId } = params as unknown as Params;

    if ((user as User).id !== +userId) {
      throw new BadRequestException(
        'This user is not the owner of the data that want to access',
      );
    }

    return true;
  }
}
