export type JanusCommand =
  | 'create'
  | 'destroy'
  | 'attach'
  | 'detach'
  | 'message'
  | 'hangup';
export type JanusPlugin =
  | 'videocall'
  | 'videoroom'
  | 'nosip'
  | 'textroom'
  | 'echotest';

export class JanusCommandBody {
  audio?: boolean;
  video?: boolean;
}

export class JanusRequest {
  janus: JanusCommand;
  body?: JanusCommandBody;
  plugin?: JanusPlugin;
  transaction?: string;
  apisecret: string;
}

export class JanusCommandRequest extends JanusRequest {
  janus: 'message';
}
