import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

//TODO: actually implement filters

@Catch()
export class GameWsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
