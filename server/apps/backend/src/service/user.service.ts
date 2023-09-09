import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@/entity';
import { UpdateUserImageDto, UpdateUserDto } from '@/utils/dtos/user.dto';
import { ImageService } from './image.service';
import { UserRepository } from '@/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly imageService: ImageService,
    private readonly userRepository: UserRepository,
  ) {}

  public async getAllUser(): Promise<User[]> {
    const user = await this.userRepository.getAllUserAccount();
    if (!user) {
      throw new BadRequestException('Not found');
    }
    return user;
  }

  public async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestException('Not found');
    }
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Not found');
    }
    return user;
  }

  public async getRawUserDataByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getRawUserDataByEmail(email);
    if (!user) {
      throw new BadRequestException('Not found');
    }
    return user;
  }

  public async updateUserInfo(userId: number, body: UpdateUserDto) {
    return this.userRepository.updateUserInformation(userId, body);
  }

  public async updateImage(userId: number, body: UpdateUserImageDto) {
    const imagePath = body.image
      ? this.imageService.saveImageFromBase64(
          body.image,
          'users',
          `${userId}.png`,
        )
      : this.imageService.defaultImagePath('users');
    return await this.userRepository.updateUserImage(userId, imagePath);
  }

  public async deleteUserAccount(userId: number) {
    this.imageService.deleteImageFromName('users', `${userId}.png`);
    return this.userRepository.deleteUserAccount(userId);
  }
}
