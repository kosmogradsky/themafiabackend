import { Injectable, HttpService, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';

import {
  JanusRequest,
  JanusPlugin,
  JanusCommandRequest,
} from './interfaces/janusrequest.interface';

@Injectable()
export class JanusService {
  private logger: Logger = new Logger(JanusService.name);
  private janusAPIBaseUrl: string = process.env.JANUS_API_BASE_URL;
  private janusAPISecret: string = process.env.JANUS_API_SECRET;

  constructor(private http: HttpService) {}

  generateTransaction() {
    return Math.random().toString(36).slice(2);
  }

  getJanusInfo() {
    return this.http
      .get(this.janusAPIBaseUrl + 'info/')
      .pipe(map((response) => response.data));
  }

  createSession() {
    const transaction = this.generateTransaction();
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

  destroySession(session: string) {
    const transaction = this.generateTransaction();
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

  attachPlugin(session: string, plugin: JanusPlugin) {
    const transaction = this.generateTransaction();
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

  detachPlugin(session: string, plugin: JanusPlugin) {
    const transaction = this.generateTransaction();
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

  hangupPeerConnection(session: string) {
    const transaction = this.generateTransaction();
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

  toggleAudio(session: string, audio: boolean) {
    const transaction = this.generateTransaction();
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

  toggleVideo(session: string, video: boolean) {
    const transaction = this.generateTransaction();
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
    session: string,
    request: JanusCommandRequest,
    pluginEndpoint = '',
  ) {
    const transaction = this.generateTransaction();
    this.logger.log(
      `Trying to send command request ${request} for session ${session} with transaction ${transaction}...`,
    );

    request.transaction = transaction;
    request.apisecret = this.janusAPISecret;

    return this.http
      .post(this.janusAPIBaseUrl + `${session}/${pluginEndpoint}`, request)
      .pipe(map((response) => response.data));
  }
}
