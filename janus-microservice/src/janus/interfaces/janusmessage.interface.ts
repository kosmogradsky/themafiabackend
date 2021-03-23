interface JanusEvent {
  transport: string;
  id: number;
  data: Record<string, unknown>;
}

export interface JanusMessage {
  emitter: string;
  type: number;
  timestamp: number;
  session_id: number;
  event: JanusEvent;
}
