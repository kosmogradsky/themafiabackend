import { Controller, Get, Logger } from '@nestjs/common';
import { RmqContext, Ctx, EventPattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { JanusService } from './janus.service';
import { JanusMessage } from './interfaces/janusmessage.interface';

@Controller()
export class JanusController {
  constructor(private janusService: JanusService) {}

  private logger: Logger = new Logger(JanusController.name);

  //@MessagePattern()
  @EventPattern() //we do not need to answer anything to MQ here
  handleMessage(@Ctx() context: RmqContext) {
    let originalMessages = context.getMessage().content.toString();
    try {
      originalMessages = JSON.parse(originalMessages);
    } catch (e) {
      this.logger.log(`Wrong message from Janus: ${originalMessages}`);
      return false;
    }

    originalMessages.forEach((message: JanusMessage) => {
      this.logger.log(
        `New Janus event ID ${message.event.id || message.session_id}, type ${
          message.type
        }`,
      );
    });
  }

  @Get()
  getJanusInfo(): Observable<any> {
    return this.janusService.getJanusInfo();
  }
}
