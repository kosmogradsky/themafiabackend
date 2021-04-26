import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  get(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async getByUsername({ username }: any): Promise<User> {
    return await this.usersRepository.findOne({
      username: username,
    });
  }

  async login({ username, password }: UserDTO): Promise<User> {
    const user = await this.usersRepository.findOne({ username: username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const passwordsAreEqual = await bcrypt.compare(password, user.password);
    if (!passwordsAreEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async update(userData: UserDTO): Promise<User> {
    const user = await this.usersRepository.findOne(userData.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.usersRepository.save({ ...user, ...userData });
  }

  async create(userData: UserDTO): Promise<User> {
    const user = await this.usersRepository.findOne({
      username: userData.username,
    });
    if (user) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.usersRepository.save(userData);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
