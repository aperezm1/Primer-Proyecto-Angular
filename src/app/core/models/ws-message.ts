export type WsMessageType = 'chat' | 'notification' | 'status' | 'ping' | 'pong';

export interface WsPayload {
  text: string;
}

export interface WsMessage {
  type: WsMessageType;
  payload: WsPayload;
  from?: 'user' | 'bot' | 'system';
  timestamp: string;
}