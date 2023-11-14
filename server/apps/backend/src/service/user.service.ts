import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@/entity';
import { UpdateUserDto } from '@/utils/dtos/user.dto';
import { ImageService } from './image.service';
import { UserRepository } from '@/repositories/user.repository';
import { UploadService } from '@/service/upload.service';

@Injectable()
export class UserService {
  constructor(
    private readonly imageService: ImageService,
    private readonly uploadService: UploadService,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.getUserById(userId, null);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getRawUserDataById(id: number): Promise<User> {
    const user = await this.userRepository.getRawUserDataById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email, null);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getRawUserDataByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getRawUserDataByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async update(userId: number, body: UpdateUserDto) {
    return this.userRepository.update(userId, body);
  }

  public async updateImage(userId: number, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No image were sent.');
    const imagePath = await this.uploadService.uploadFile(file, userId);
    return this.userRepository.updateImage(userId, imagePath);
  }

  public async delete(userId: number) {
    this.imageService.delete('users', `${userId}.png`);
    return this.userRepository.delete(userId);
  }
}
