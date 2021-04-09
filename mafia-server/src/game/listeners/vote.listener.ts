import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { VoteMadeEvent } from '../events/vote.event';

@Injectable()
export class VoteListener {
  private logger: Logger = new Logger(VoteListener.name);

  @OnEvent('vote.created')
  handleVoteMadeEvent(event: VoteMadeEvent) {
    this.logger.log(
      `EVENT VoteMadeEvent on GAME ID ${event.vote.player.game.id}: VOTE ID ${event.vote.id}`,
    );
  }
}
