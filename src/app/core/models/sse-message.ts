export interface SseMessage {
  timestamp: string;
  messageKey: string;
  value: number;
}