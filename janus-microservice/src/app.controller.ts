import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { AppService } from './app.service';

import { JanusMessage } from './interfaces/janusmessage.interface'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private logger: Logger = new Logger('JanusEventHandler');

  @MessagePattern()
  handleMessage(
    @Payload() data: unknown,
    @Ctx() context: RmqContext
  ) {
    let originalMessages = context.getMessage().content.toString();
    try {
      originalMessages = JSON.parse(originalMessages);
    } catch (e) {
      this.logger.log(`Wrong message from Janus: ${originalMessages}`)
      return false;
    }
    originalMessages.map((message: JanusMessage) => {
      this.logger.log(`New Janus event ID ${message.event.id}, type ${message.type}`);
    })
  }
}
