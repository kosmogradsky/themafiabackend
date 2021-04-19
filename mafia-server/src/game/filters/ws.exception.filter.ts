import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class GameWsExceptionFilter extends BaseWsExceptionFilter {
  private logger: Logger = new Logger(GameWsExceptionFilter.name);

  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const data = ctx.getData();
    const client = ctx.getClient();

    const error = exception.getError();

    this.logger.log(
      `Handling WS error ${error.toString}: request from client ${client} with data ${data}`,
    );

    super.catch(exception, host);
  }
}
