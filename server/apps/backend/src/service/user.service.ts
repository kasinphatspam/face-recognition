import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { UpdateUserImageDto, UpdateUserDto } from 'src/utils/dtos/user.dto';
import { Repository } from 'typeorm';
import { ImageService } from './image.service';

@Injectable()
export class UserService {
  constructor(
    private readonly imageService: ImageService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getAllUser(): Promise<User[]> {
    const user = await this.userRepository.find();
    if (!user) {
      throw new BadRequestException('Not found');
    }
    return user;
  }

  public async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId: userId });
    if (!user) {
      throw new BadRequestException('Not found');
    }
    return user;
  }

  public async updateUserInfo(userId: number, body: UpdateUserDto) {
    return this.userRepository.update(
      { userId: userId },
      {
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
        personalId: body.personalId,
        dob: body.dob,
      },
    );
  }

  public async updateImage(userId: number, body: UpdateUserImageDto) {
    const imagePath = body.image
      ? this.imageService.saveImageFromBase64(
          body.image,
          'users',
          `${userId}.png`,
        )
      : this.imageService.defaultImagePath('users');
    return this.userRepository.update(
      { userId: userId },
      {
        image: imagePath,
      },
    );
  }

  public async deleteUserAccount(userId: number) {
    return this.userRepository.delete({ userId: userId });
  }
}
