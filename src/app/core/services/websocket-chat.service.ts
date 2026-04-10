import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { REALTIME_ENDPOINTS } from '../constants/realtime-endpoints.constant';
import { WsConnectionState } from '../models/ws-connection-state';
import { WsMessage, WsMessageType } from '../models/ws-message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketChatService {
  private socket?: WebSocketSubject<WsMessage>;
  private socketSubscription?: Subscription;
  private reconnectAttempts = 0;

  private readonly maxReconnectAttempts = 5;
  private readonly messagesSubject = new Subject<WsMessage>();
  private readonly connectionStateSubject = new BehaviorSubject<WsConnectionState>('closed');

  readonly messages$ = this.messagesSubject.asObservable();
  readonly connectionState$ = this.connectionStateSubject.asObservable();

  connect(url: string = REALTIME_ENDPOINTS.websocket): void {
    if (this.socket && !this.socket.closed) {
      return;
    }

    this.connectionStateSubject.next('connecting');

    this.socket = webSocket<WsMessage>({
      url,
      serializer: (msg) => JSON.stringify(msg),
      deserializer: (event) => this.deserializeMessage(event.data),
      openObserver: {
        next: () => {
          this.reconnectAttempts = 0;
          this.connectionStateSubject.next('connected');
        }
      },
      closeObserver: {
        next: () => {
          this.connectionStateSubject.next('closed');
        }
      }
    });

    this.socketSubscription = this.socket.subscribe({
      next: (message) => {
        if (this.isValidMessage(message)) {
          this.messagesSubject.next(message);
        }
      },
      error: () => {
        this.connectionStateSubject.next('error');
        this.tryReconnect(url);
      },
      complete: () => {
        this.connectionStateSubject.next('closed');
      }
    });
  }

  sendChat(text: string): void {
    this.send('chat', text, 'user');
  }

  sendPing(): void {
    this.send('ping', 'ping', 'system');
  }

  messagesByType(type: WsMessageType): Observable<WsMessage> {
    return this.messages$.pipe(filter((msg) => msg.type === type));
  }

  close(): void {
    this.socketSubscription?.unsubscribe();
    this.socket?.complete();
    this.socket = undefined;
    this.connectionStateSubject.next('closed');
  }

  private send(type: WsMessageType, text: string, from: WsMessage['from']): void {
    if (!this.socket || this.socket.closed) {
      return;
    }

    this.socket.next({
      type,
      payload: { text },
      from,
      timestamp: new Date().toISOString()
    });
  }

  private deserializeMessage(rawData: unknown): WsMessage {
    const parsed = JSON.parse(String(rawData)) as Partial<WsMessage>;

    return {
      type: this.normalizeType(parsed.type),
      payload: {
        text: parsed.payload?.text ? String(parsed.payload.text) : ''
      },
      from: parsed.from ?? 'system',
      timestamp: parsed.timestamp ? String(parsed.timestamp) : new Date().toISOString()
    };
  }

  private normalizeType(type: unknown): WsMessageType {
    if (type === 'chat' || type === 'notification' || type === 'status' || type === 'ping' || type === 'pong') {
      return type;
    }

    return 'notification';
  }

  private isValidMessage(message: WsMessage): boolean {
    return !!message?.type && !!message?.payload && typeof message.payload.text === 'string' && !!message.timestamp;
  }

  private tryReconnect(url: string): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.connectionStateSubject.next('error');
      return;
    }

    this.reconnectAttempts += 1;
    this.connectionStateSubject.next('reconnecting');

    timer(1500 * this.reconnectAttempts).subscribe(() => {
      this.connect(url);
    });
  }
}