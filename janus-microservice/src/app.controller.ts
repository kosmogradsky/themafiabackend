import { Controller, Get } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private logger: Logger = new Logger('JanusEventHandler');

  @MessagePattern()
  handleMessage(
    @Payload() data: unknown,
    @Ctx() context: RmqContext
  ) {
    //TODO: error handling, interface for message
    const originalMessages = JSON.parse(context.getMessage().content.toString());
    originalMessages.map((message: any) => {
      this.logger.log(`New Janus event ID ${message.event.id}, type ${message.type}`);
    })
  }
}
