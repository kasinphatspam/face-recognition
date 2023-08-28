import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthRegisterDto,
} from '@/utils/dtos/auth.dto';
import { User } from '@/entity';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  public async login(body: AuthLoginDto): Promise<User> {
    const email = body.email;
    const password = body.password;
    const user = await this.userService.getRawUserDataByEmail(email);
    if (!user)
      throw new BadRequestException('The user account with this email address was not found.');
    if (!await bcrypt.compare(password, user.password))
      throw new BadRequestException('Password Incorrect.');
    
    return await this.userService.getUserByEmail(email);
  }

  public async register(body: AuthRegisterDto): Promise<User> {
    const date = new Date(body.dob.toString())
    const hashedPassword = await bcrypt.hash(body.password, 12);
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: body.email,
          password: hashedPassword,
          firstname: body.firstname,
          lastname: body.lastname,
          gender: body.gender,
          personalId: body.personalId,
          dob: date,
          image: body.image,
        },
      ])
      .execute();
    return await this.userService.getUserByEmail(body.email);
  }

  public async forgotPassword(body: AuthForgotPasswordDto) {
    return;
  }
}
