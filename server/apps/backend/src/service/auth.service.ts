import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Request } from 'express';
import {
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthRegisterDto,
} from '@/utils/dtos/auth.dto';
import { User } from '@/entity';
import * as bcrypt from 'bcrypt';
import { UserService } from '@/service/user.service';
import { ImageService } from '@/service/image.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(body: AuthLoginDto): Promise<string> {
    const { email, password } = body;
    const user = await this.userService.getRawUserDataByEmail(email);
    if (!user)
      throw new BadRequestException(
        'The user account with this email address was not found.',
      );
    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('Password Incorrect.');

    const jwt = await this.jwtService.signAsync({ id: user.id });

    return jwt;
  }

  public async register(body: AuthRegisterDto): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('email = :email OR personalId = :personalId', {
        email: body.email,
        personalId: body.personalId,
      })
      .getOne();

    if (user) {
      if (user.email === body.email) {
        throw new BadRequestException('This email already exists.');
      }
      if (user.personalId === body.personalId) {
        throw new BadRequestException('This personalId already exists.');
      }
    }

    const date = new Date(body.dob.toString());
    const hashedPassword = await bcrypt.hash(body.password, 12);
    let imagePath = this.imageService.defaultImagePath('users');
    const newUser = await this.userRepository
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
          image: imagePath,
        },
      ])
      .execute();

    if (body.image) {
      imagePath = this.imageService.saveImageFromBase64(
        body.image,
        'users',
        `${newUser.raw.insertId}.png`,
      );
      await this.userRepository.update(
        { id: newUser.raw.insertId },
        { image: imagePath },
      );
    }

    return await this.userService.getUserByEmail(body.email);
  }

  public async me(req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.findOneBy(data.id);

      return user;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException("You're not allowed to access this.");
      }

      if (error instanceof Error) {
        throw new UnauthorizedException('You must login first.');
      }
    }
  }

  public async forgotPassword(body: AuthForgotPasswordDto) {
    return;
  }
}
