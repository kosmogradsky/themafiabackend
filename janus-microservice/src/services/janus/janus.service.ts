import { Injectable, HttpService, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';

import {
  JanusRequest,
  JanusPlugin,
  JanusCommandRequest,
} from '../../interfaces/janusrequest.interface';

@Injectable()
export class JanusService {
  private logger: Logger = new Logger(JanusService.name);
  private janusAPIBaseUrl: string = process.env.JANUS_API_BASE_URL;
  private janusAPISecret: string = process.env.JANUS_API_SECRET;

  constructor(private http: HttpService) {}

  getJanusInfo() {
    return this.http
      .get(this.janusAPIBaseUrl + 'info/')
      .pipe(map((response) => response.data));
  }

  createSession(transaction: string) {
    this.logger.log(
      `Trying to create a session with transaction: ${transaction}...`,
    );

    const request: JanusRequest = {
      janus: 'create',
      transaction: transaction,
      apisecret: this.janusAPISecret,
    };

    return this.http
      .post(this.janusAPIBaseUrl, request)
      .pipe(map((response) => response.data));
  }

  destroySession(transaction: string, session: string) {
    this.logger.log(
      `Trying to destroy session ${session} with transaction ${transaction}...`,
    );

    const request: JanusRequest = {
      janus: 'destroy',
      transaction: transaction,
      apisecret: this.janusAPISecret,
    };

    return this.http
      .post(this.janusAPIBaseUrl + `${session}/`, request)
      .pipe(map((response) => response.data));
  }

  attachPlugin(transaction: string, session: string, plugin: JanusPlugin) {
    this.logger.log(
      `Trying to attach plugin ${plugin} to session ${session} with transaction ${transaction}...`,
    );

    const request: JanusRequest = {
      janus: 'attach',
      plugin: plugin,
      transaction: transaction,
      apisecret: this.janusAPISecret,
    };

    return this.http
      .post(this.janusAPIBaseUrl + `${session}/`, request)
      .pipe(map((response) => response.data));
  }

  detachPlugin(transaction: string, session: string, plugin: JanusPlugin) {
    this.logger.log(
      `Trying to detach plugin ${plugin} from session ${session} with transaction ${transaction}...`,
    );

    const request: JanusRequest = {
      janus: 'detach',
      plugin: plugin,
      transaction: transaction,
      apisecret: this.janusAPISecret,
    };

    return this.http
      .post(this.janusAPIBaseUrl + `${session}/`, request)
      .pipe(map((response) => response.data));
  }

  hangupPeerConnection(transaction: string, session: string) {
    this.logger.log(
      `Trying to hangup PeerConnection for session ${session} with transaction ${transaction}...`,
    );

    const request: JanusRequest = {
      janus: 'hangup',
      transaction: transaction,
      apisecret: this.janusAPISecret,
    };

    return this.http
      .post(this.janusAPIBaseUrl + `${session}/`, request)
      .pipe(map((response) => response.data));
  }

  toggleAudio(transaction: string, session: string, audio: boolean) {
    this.logger.log(
      `Trying to toggle audio to ${audio} for session ${session} with transaction ${transaction}...`,
    );

    const request: JanusRequest = {
      janus: 'message',
      body: {
        audio: audio,
      },
      transaction: transaction,
      apisecret: this.janusAPISecret,
    };

    return this.http
      .post(this.janusAPIBaseUrl + `${session}/`, request)
      .pipe(map((response) => response.data));
  }

  toggleVideo(transaction: string, session: string, video: boolean) {
    this.logger.log(
      `Trying to toggle video to ${video} for session ${session} with transaction ${transaction}...`,
    );

    const request: JanusRequest = {
      janus: 'message',
      body: {
        video: video,
      },
      transaction: transaction,
      apisecret: this.janusAPISecret,
    };

    return this.http
      .post(this.janusAPIBaseUrl + `${session}/`, request)
      .pipe(map((response) => response.data));
  }

  sendCommand(
    transaction: string,
    session: string,
    request: JanusCommandRequest,
  ) {
    this.logger.log(
      `Trying to send command request ${request} for session ${session} with transaction ${transaction}...`,
    );

    request.transaction = transaction;
    request.apisecret = this.janusAPISecret;

    return this.http
      .post(this.janusAPIBaseUrl + `${session}/`, request)
      .pipe(map((response) => response.data));
  }
}
