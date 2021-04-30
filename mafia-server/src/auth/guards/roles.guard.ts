import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const client = context.switchToWs().getClient();
    const cookies: string[] = client.handshake.headers.cookie.split('; ');
    const authToken = cookies
      .find((cookie) => cookie.startsWith('jwt'))
      .split('=')[1];
    const jwtPayload = this.authService.verify(authToken);
    const user = await this.authService.validateUser(jwtPayload);
    context.switchToWs().getData().user = user;

    if (!user) {
      return false;
    }

    const currentPlayer = user.players[user.players.length - 1];
    if (roles === ['narrator']) {
      return currentPlayer.role === 'narrator';
    }

    const requestData = JSON.parse(context.switchToWs().getData());
    const player = 'player' in requestData ? requestData.player : false;

    if ('player_or_narrator' in roles) {
      return currentPlayer === player || currentPlayer.role === 'narrator';
    }

    return currentPlayer === player && player.role in roles;
  }
}
