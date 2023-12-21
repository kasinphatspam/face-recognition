import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@/common/entities';
import { UpdateUserDto } from '@/common/dto/user.dto';
import { UserRepository } from '@/users/user.repository';
import { UploadService } from '@/common/services/upload.service';
import { GetUserBySpecifyRelations } from '@/common/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['organization', 'role'] });
  }

  public async findAllBy(key: number): Promise<User[]> {
    return this.userRepository.getAllUsersBy(key as number, 'organization', [
      'role',
    ]);
  }

  public async getUserBy(
    key: number | string,
    realtions: GetUserBySpecifyRelations,
  ): Promise<User> {
    const user = await this.userRepository.getUserBy(key, realtions);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getRawUserBy(key: number | string): Promise<User> {
    const user = await this.userRepository.getUserWithPasswordBy(key);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async update(userId: number, body: UpdateUserDto) {
    return this.userRepository.updateById(userId, body);
  }

  public async exitOrg(userId: number) {
    await this.userRepository.update(
      { id: userId },
      { organization: null, role: null },
    );
  }

  public async updateImage(userId: number, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No image were sent.');
    const imagePath = await this.uploadService.uploadImageToStorage(
      file,
      'users',
      userId,
    );
    return this.userRepository.update(userId, { image: imagePath });
  }

  public async delete(userId: number) {
    return this.userRepository.deleteById(userId);
  }
}
