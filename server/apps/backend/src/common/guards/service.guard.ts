import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class ServiceGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (process.env.ACCESS_KEY != request.headers['access-key']) {
      throw new BadRequestException("This request don't have access-key");
    }

    return true;
  }
}
