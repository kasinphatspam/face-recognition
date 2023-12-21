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
  AuthChangePasswordWithConfirmation,
  AuthChangePasswordWithOutConfirmation,
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthRegisterDto,
  AuthVerifyResetPassword,
} from '@/common/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ImageService } from '@/common/services/image.service';
import { UserRepository } from '@/users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly imageService: ImageService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(body: AuthLoginDto): Promise<string> {
    const { email, password } = body;
    const user = await this.userRepository.getUserWithPasswordBy(email);

    if (!user)
      throw new BadRequestException(
        'the provided email address does not appear to be registered in our system',
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException(
        'username or password you entered incorrect.',
      );

    const jwt = await this.jwtService.signAsync({ id: user.id });
    return jwt;
  }

  public async register(body: AuthRegisterDto): Promise<string> {
    const isAvailable = await this.userRepository.isAvailable(
      body.email,
      body.personalId,
    );
    if (isAvailable) {
      throw new BadRequestException(
        'This email or personal ID  already exists.',
      );
    }
    const { password, ...newObject } = body;

    const encryptedPassword = await bcrypt.hash(password, 12);

    const payload = {
      ...newObject,
      password: encryptedPassword,
    };
    const newUser = await this.userRepository.createUser(payload);

    const jwt = await this.jwtService.signAsync({ id: newUser.raw.insertId });
    return jwt;
  }

  public async me(req: Request) {
    try {
      const session = req.cookies['jwt'] || req.headers['session'];
      const data = await this.jwtService.verifyAsync(session);

      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userRepository.getUserBy(data.id, [
        'organization',
        'role',
      ]);
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

  public async changePassword(
    userId: number,
    body: AuthChangePasswordWithConfirmation,
  ) {
    const user = await this.userRepository.getUserWithPasswordBy(userId);

    if (!(await bcrypt.compare(body.oldPassword, user.password)))
      throw new BadRequestException('Password you entered incorrect.');

    const password = await bcrypt.hash(body.password, 12);
    await this.userRepository.update(userId, { password: password });
  }

  public async changePasswordWithOutConfirmation(
    body: AuthChangePasswordWithOutConfirmation,
  ) {
    const password = await bcrypt.hash(body.password, 12);
    await this.userRepository.update(body.id, { password: password });
  }

  public async forgotPassword(body: AuthForgotPasswordDto) {
    const user = await this.userRepository.getUserBy(body.email, null);
    return user;
  }

  public async verify(body: AuthVerifyResetPassword) {
    const user = await this.userRepository.getUserBy(body.email, null);

    if (!user) {
      throw new NotFoundException();
    }
  }
}
