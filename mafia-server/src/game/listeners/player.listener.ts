import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  FoulAssignedEvent,
  PlayerKickedEvent,
  PlayerKilledEvent,
} from '../events/player.event';

@Injectable()
export class PlayerListener {
  private logger: Logger = new Logger(PlayerListener.name);

  @OnEvent('player.killed')
  handlePlayerKilledEvent(event: PlayerKilledEvent) {
    this.logger.log(
      `EVENT PlayerKilledEvent on GAME ID ${event.player.game.id}: PLAYER ID ${event.player.id}`,
    );
  }

  @OnEvent('player.kicked')
  handlePlayerKickedEvent(event: PlayerKickedEvent) {
    this.logger.log(
      `EVENT PlayerKickedEvent on GAME ID ${event.player.game.id}: PLAYER ID ${event.player.id}`,
    );
  }

  @OnEvent('player.foul')
  handleFoulAssignedEvent(event: FoulAssignedEvent) {
    this.logger.log(
      `EVENT FoulAssignedEvent on GAME ID ${event.player.game.id}: PLAYER ID ${event.player.id}`,
    );
  }
}
