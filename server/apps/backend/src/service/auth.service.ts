import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthForgotPasswordDto, AuthLoginDto, AuthRegisterDto } from 'src/utils/dtos/auth.dto';
import { User } from 'src/entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async login(body: AuthLoginDto): Promise<User> {
    const email = body.email
    const password = body.password
    const user = await this.userRepository.findOneBy({email: email})
    if(user.password != password)
      throw new BadRequestException('Password Incorrect.')
    return user
  }

  public async register(body: AuthRegisterDto): Promise<User> {
    await this.userRepository
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        email: body.email,
        password: body.password,
        firstName: body.fname,
        lastName: body.lname,
        gender: body.gender,
        dob: body.dob,
        image: body.profile_image
      }
    ])
    .execute()
    return await this.userRepository.findOneBy({email: body.email})
  }

  public async forgotPassword(body: AuthForgotPasswordDto) {
    return
  }

}