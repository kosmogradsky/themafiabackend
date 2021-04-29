import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { IJwtPayload } from '../interfaces/jwt.payload.interface';
import { IJwtToken, ILoginStatus } from '../interfaces/login.status.interface';
import { IRegistrationStatus } from '../interfaces/registration.status.interface';

import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private _createToken({ username }: UserDTO): IJwtToken {
    const user: IJwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.JWT_EXPIRES_IN,
      accessToken,
    };
  }

  verify(authToken: string): IJwtPayload {
    return <IJwtPayload>jwt.verify(authToken, process.env.JWT_SECRET_KEY);
  }

  async register(userDTO: UserDTO): Promise<IRegistrationStatus> {
    let status: IRegistrationStatus = {
      success: true,
      message: 'Registration successful',
    };

    try {
      await this.userService.create(userDTO);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(userDTO: UserDTO): Promise<ILoginStatus> {
    const user = await this.userService.login(userDTO);
    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: IJwtPayload): Promise<User> {
    const user = await this.userService.getByUsername(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
