import { Controller, Get } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

import { AppService } from './app.service';

import { JanusMessage } from './interfaces/janusmessage.interface'
import { JanusService } from './services/janus/janus.service'
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private janusService: JanusService,
  ) { }

  private logger: Logger = new Logger('JanusEventHandler')

  @MessagePattern()
  handleMessage(
    @Ctx() context: RmqContext
  ) {
    let originalMessages = context.getMessage().content.toString();

    try {
      originalMessages = JSON.parse(originalMessages);
    } catch (e) {
      this.logger.log(`Wrong message from Janus: ${originalMessages}`)
      return false;
    }

    originalMessages.forEach((message: JanusMessage) => {
      this.logger.log(`New Janus event ID ${message.event.id || message.session_id}, type ${message.type}`);
    })
  }

  @Get()
  getJanusInfo(): Observable<any> {
    return this.janusService.createSession("test");
  }
}
