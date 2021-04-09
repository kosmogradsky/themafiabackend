import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  JanusSessionCreatedEvent,
  JanusVideoRoomCreatedEvent,
} from '../events/game.event';

@Injectable()
export class GameListener {
  private logger: Logger = new Logger(GameListener.name);

  @OnEvent('game.session_attached')
  handleJanusSessionCreatedEvent(event: JanusSessionCreatedEvent) {
    this.logger.log(
      `EVENT JanusSessionCreatedEvent on GAME ID ${event.game.id}: Janus Session ${event.janusSession}`,
    );
  }

  @OnEvent('game.videoroom_attached')
  handleJanusVideoRoomCreatedEvent(event: JanusVideoRoomCreatedEvent) {
    this.logger.log(
      `EVENT JanusVideoRoomCreatedEvent on GAME ID ${event.game.id}: Janus Session ${event.videoRoom}`,
    );
  }
}
