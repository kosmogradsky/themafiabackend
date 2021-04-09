import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ShotFiredEvent } from '../events/shot.event';

@Injectable()
export class ShotListener {
  private logger: Logger = new Logger(ShotListener.name);

  @OnEvent('shot.created')
  handleShotFiredEvent(event: ShotFiredEvent) {
    this.logger.log(
      `EVENT ShotFiredEvent on GAME ID ${event.shot.player.game.id}: SHOT ID ${event.shot.id}`,
    );
  }
}
