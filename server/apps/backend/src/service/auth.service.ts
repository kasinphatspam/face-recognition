import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthLoginResult,
  AuthRegisterDto,
} from '@/utils/dtos/auth.dto';
import { User } from '@/entity';
import * as bcrypt from 'bcrypt';
import { UserService } from '@/service/user.service';
import { ImageService } from '@/service/image.service';
import { UserRepository } from '@/repositories/user.repository';
import { OTPService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    private readonly jwtService: JwtService,
    private readonly otpService: OTPService,
  ) {}

  public async login(body: AuthLoginDto): Promise<AuthLoginResult> {
    const { email, password } = body;
    const user = await this.userService.getRawUserDataByEmail(email);

    if (!user)
      throw new NotFoundException(
        'The user account with this email address was not found.',
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException(
        'username or password you entered incorrect.',
      );

    const jwt = await this.jwtService.signAsync({ id: user.id });

    const result = new AuthLoginResult();
    result.id = user.id;
    result.jwt = jwt;

    return result;
  }

  public async register(body: AuthRegisterDto): Promise<User> {
    const userArray = await this.userRepository.findAll();
    for (const i of userArray) {
      if (i.email === body.email) {
        throw new BadRequestException('This email already exists.');
      }
      if (i.personalId === body.personalId) {
        throw new BadRequestException('This personalId already exists.');
      }
    }
    const password = await bcrypt.hash(body.password, 12);

    let imagePath = this.imageService.defaultImagePath('users');
    const newUser = await this.userRepository.insert(body, password, imagePath);

    if (body.image) {
      imagePath = this.imageService.saveImageFromBase64(
        body.image,
        'users',
        `${newUser.raw.insertId}.png`,
      );
      await this.userRepository.updateImage(newUser.raw.insertId, imagePath);
    }

    return this.userService.getUserByEmail(body.email);
  }

  public async me(req: Request) {
    try {
      const cookie = req.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userRepository.getUserById(data.id, null);
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
    const user = await this.userRepository.getUserByEmail(body.email, null);

    if (!user) {
      throw new NotFoundException();
    }
    return this.otpService.send(user.id, 'forgot password');
  }
}
