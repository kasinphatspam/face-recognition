import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
})

export class UserModule { }