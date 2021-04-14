import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameStateDTO } from '../dto/gamestate.dto';

@WebSocketGateway(Number(process.env.WS_PORT))
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger(GameGateway.name);

  //TODO: better to have validation (pipes) for all @SubscribeMessage methods

  //TODO: authentication / guards should be added here as well

  afterInit(server: Server) {
    this.logger.log(`${GameGateway.name} initialized, server info - ${server}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected, args: ${args}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('state.get')
  handleStateRequest(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    const newData: GameStateDTO = JSON.parse(data);
    this.logger.log(
      `Game state requested for game ${newData.game.id} from client ${client}`,
    );
    return data;
  }

  @SubscribeMessage('role.assign')
  handleRoleAssignment(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }

  @SubscribeMessage('player.update')
  handlePlayerUpdate(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }

  @SubscribeMessage('vote.create')
  handleVote(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }

  @SubscribeMessage('shot.create')
  handleShot(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }

  @SubscribeMessage('foul.create')
  handleFoul(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }

  @SubscribeMessage('janus.*')
  handleMediaRequest(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }

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
