class JanusEvent {
  transport: string;
  id: number;
  data: Record<string, unknown>;
}

export class JanusMessage {
  emitter: string;
  type: number;
  timestamp: number;
  session_id: number;
  event: JanusEvent;
}
