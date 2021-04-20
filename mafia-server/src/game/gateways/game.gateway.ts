import {
  Inject,
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { FoulAssignmentDTO } from '../dto/foul.dto';
import { GameDTO } from '../dto/game.dto';
import { JanusRequestDTO } from '../dto/janus.request.dto';
import { PlayerDTO } from '../dto/player.dto';
import { RoleAssignmentDTO } from '../dto/role.assignment.dto';
import { ShotDTO } from '../dto/shot.dto';
import { VoteDTO } from '../dto/vote.dto';
import { GameWsExceptionFilter } from '../filters/ws.exception.filter';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
import { ShotService } from '../services/shot.service';
import { VoteService } from '../services/vote.service';

@WebSocketGateway()
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject('JANUS_SERVICE') private janusService: ClientProxy,
    private gameService: GameService,
    private playerService: PlayerService,
    private shotService: ShotService,
    private voteService: VoteService,
  ) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger(GameGateway.name);

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

  @UseFilters(GameWsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('state.get')
  async handleStateRequest(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    const game: GameDTO = JSON.parse(data);
    this.logger.log(
      `Current game state requested for game ${game.id} from client ${client}`,
    );
    const newGameData = await this.gameService.get(game.id);

    return { event: 'state', data: newGameData };
  }

  @UseFilters(GameWsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('role.assign')
  async handleRoleAssignment(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    const players: RoleAssignmentDTO[] = JSON.parse(data);
    this.logger.log(
      `Role assignment requested for players ${players} from client ${client}`,
    );
    const roles = players.map(async (roleAssignment) => {
      roleAssignment.player.role = roleAssignment.r_hash;
      return (await this.playerService.update(roleAssignment.player))
        ? roleAssignment
        : false;
    });
    return { event: 'role.assign', data: roles };
  }

  @UseFilters(GameWsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('player.update')
  async handlePlayerUpdate(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    const player: PlayerDTO = JSON.parse(data);
    this.logger.log(
      `Player update requested for player ${player.id} from client ${client}`,
    );
    const newPlayerData = this.playerService.get(player.id);
    return { event: 'player.update', data: newPlayerData };
  }

  @UseFilters(GameWsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('vote.create')
  async handleVote(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    const vote: VoteDTO = JSON.parse(data);
    this.logger.log(
      `New vote requested: player ${vote.player.id} votes against ${vote.choice.id} in game ${vote.player.game.id} from client ${client}`,
    );
    const newVote = await this.voteService.create(vote);
    return { event: 'vote.create', data: newVote };
  }

  @UseFilters(GameWsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('shot.create')
  async handleShot(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    const shot: ShotDTO = JSON.parse(data);
    this.logger.log(
      `New shot requested: player ${shot.player.id} shoots player ${shot.aim.id} in game ${shot.player.game.id} from client ${client}`,
    );
    const newShot = await this.shotService.create(shot);
    return { event: 'shot.create', data: newShot };
  }

  @UseFilters(GameWsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('foul.create')
  async handleFoul(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    const foul: FoulAssignmentDTO = JSON.parse(data);
    this.logger.log(
      `New foul requested for player ${foul.player.id} from client ${client}`,
    );
    const newPlayerData = await this.playerService.addFoul(foul.player);
    return { event: 'foul.create', data: newPlayerData };
  }

  @UseFilters(GameWsExceptionFilter)
  @UsePipes(ValidationPipe)
  @SubscribeMessage('janus.*')
  async handleMediaRequest(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse> {
    const janusRequest: JanusRequestDTO = JSON.parse(data);
    janusRequest.apisecret = process.env.JANUS_API_SECRET;

    this.logger.log(
      `New media request for Janus: ${data} from client ${client}`,
    );
    await this.janusService.connect();
    const response = this.janusService.send(janusRequest.janus, janusRequest);
    return { event: 'janus', data: response };
  }

  @UseFilters(GameWsExceptionFilter)
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
