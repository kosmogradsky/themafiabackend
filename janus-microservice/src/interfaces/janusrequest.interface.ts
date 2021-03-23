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

export interface JanusCommandBody {
  audio?: boolean;
  video?: boolean;
}

export interface JanusRequest {
  janus: JanusCommand;
  body?: JanusCommandBody;
  plugin?: JanusPlugin;
  transaction?: string;
  apisecret: string;
}

export interface JanusCommandRequest extends JanusRequest {
  janus: 'message';
}
