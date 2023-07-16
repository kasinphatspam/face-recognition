import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    public async getCurrentUser (): Promise<User>{
        return 
    }

}