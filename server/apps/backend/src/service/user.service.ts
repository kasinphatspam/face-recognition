import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { GetUserByIdDto, UpdateUserDto, DeleteUserDto, UpdateUserImageDto } from 'src/utils/dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
      ) {}

    public async getCurrentUser(): Promise<User>{
        return 
    }

    public async getAllUser(): Promise<User[]>{
        const user = await this.userRepository.find()
        if(!user){
            throw new BadRequestException("Not found")
        }
        return user
    }

    public async getUserById(body: GetUserByIdDto): Promise<User>{
        const user = await this.userRepository.findOneBy({userId: body.userId})
        if(!user){
            throw new BadRequestException("Not found")
        }
        return user
    }

    public async update(body: UpdateUserDto){
        return this.userRepository.update({userId: body.userId},{
            firstname: body.firstname, 
            lastname: body.lastname,
            gender: body.gender,
            dob: body.dob
        })
    }

    public async updateImage(body: UpdateUserImageDto){
        return this.userRepository.update({userId: body.userId},{
            image: body.image
        })
    }

    public async delete(body: DeleteUserDto){
        return this.userRepository.delete({userId: body.userId})
    }

}