import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { PlayerDTO } from '../dto/player.dto';
import { ShotDTO } from '../dto/shot.dto';
import { VoteDTO } from '../dto/vote.dto';

@WebSocketGateway()
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger(GameGateway.name);

  //TODO: better to have validation (pipes) for all @SubscribeMessage methods

  //TODO: authentication / guards should be added here as well

  afterInit(server: Server) {
    this.logger.log(`Game Gateway initialized, server info - ${server}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected, args: ${args}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage('state.get')
  handleStateRequest(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    const state: GameStateDTO = JSON.parse(data);
    this.logger.log(
      `Current game state requested for game ${state.game.id} from client ${client}`,
    );
    return data;
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage('role.assign')
  handleRoleAssignment(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    const players: Record<string, unknown> = JSON.parse(data); //TODO: separate interface to add with validation pipes
    this.logger.log(
      `Role assignment requested for players ${players} from client ${client}`,
    );
    return data;
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage('player.update')
  handlePlayerUpdate(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    const player: PlayerDTO = JSON.parse(data);
    this.logger.log(
      `Player update requested for player ${player.id} from client ${client}`,
    );
    return data;
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage('vote.create')
  handleVote(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    const vote: VoteDTO = JSON.parse(data);
    this.logger.log(
      `New vote requested: player ${vote.player.id} votes against ${vote.choice.id} in game ${vote.player.game.id} from client ${client}`,
    );
    return data;
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage('shot.create')
  handleShot(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    const shot: ShotDTO = JSON.parse(data);
    this.logger.log(
      `New shot requested: player ${shot.player.id} shoots player ${shot.aim.id} in game ${shot.player.game.id} from client ${client}`,
    );
    return data;
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage('foul.create')
  handleFoul(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    const foul: Record<string, PlayerDTO> = JSON.parse(data); //TODO: separate interface to add with validation pipes
    this.logger.log(
      `New foul requested for player ${foul.player.id} from client ${client}`,
    );
    return data;
  }

  @UsePipes(ValidationPipe)
  @SubscribeMessage('janus.*')
  handleMediaRequest(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    this.logger.log(
      `New media request for Janus: ${data} from client ${client}`,
    );
    return data;
  }

  @UsePipes(ValidationPipe)
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
