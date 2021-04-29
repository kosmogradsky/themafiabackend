import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserDTO } from 'src/user/dto/user.dto';
import { ILoginStatus } from '../interfaces/login.status.interface';
import { IRegistrationStatus } from '../interfaces/registration.status.interface';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() userDTO: UserDTO,
  ): Promise<IRegistrationStatus> {
    const result: IRegistrationStatus = await this.authService.register(
      userDTO,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() userDTO: UserDTO): Promise<ILoginStatus> {
    return await this.authService.login(userDTO);
  }
}
