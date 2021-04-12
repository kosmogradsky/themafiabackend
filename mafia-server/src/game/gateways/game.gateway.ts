import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'node:net';
import { Server } from 'ws';

@WebSocketGateway(Number(process.env.WS_PORT))
export class GameGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger(GameGateway.name);

  @SubscribeMessage('events')
  onEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    this.logger.log(
      `Default event handler got event: ${data} from client ${client}`,
    );
    return data;
  }
}
