interface JanusEvent {
  transport: string;
  id: number;
  data: object
}

export interface JanusMessage {
  emitter: string;
  type: number;
  timestamp: number;
  session_id: number;
  event: JanusEvent
}