import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { ILoginStatus } from '../interfaces/login.status.interface';
import { IRegistrationStatus } from '../interfaces/registration.status.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('users')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOkResponse({
    status: 200,
    description: 'User registered successfully',
    type: IRegistrationStatus,
  })
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

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOkResponse({
    status: 200,
    description: 'User logged in successfully',
    type: ILoginStatus,
  })
  @Post('login')
  public async login(@Body() userDTO: UserDTO): Promise<ILoginStatus> {
    return await this.authService.login(userDTO);
  }
}
