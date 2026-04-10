import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { WsConnectionState } from '../models/ws-connection-state';
import { WsMessage } from '../models/ws-message';

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

  connect(url = 'ws://localhost:3002'): void {
    if (this.socket && !this.socket.closed) {
      return;
    }

    this.connectionStateSubject.next('connecting');

    this.socket = webSocket<WsMessage>({
      url,
      serializer: (msg) => JSON.stringify(msg),
      deserializer: (event) => JSON.parse(event.data),
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
      next: (message) => this.messagesSubject.next(message),
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
    if (!this.socket || this.socket.closed) {
      return;
    }

    this.socket.next({
      type: 'chat',
      payload: { text },
      from: 'user',
      timestamp: new Date().toISOString()
    });
  }

  sendPing(): void {
    if (!this.socket || this.socket.closed) {
      return;
    }

    this.socket.next({
      type: 'ping',
      payload: { text: 'ping' },
      from: 'system',
      timestamp: new Date().toISOString()
    });
  }

  messagesByType(type: WsMessage['type']): Observable<WsMessage> {
    return this.messages$.pipe(filter((msg) => msg.type === type));
  }

  close(): void {
    this.socketSubscription?.unsubscribe();
    this.socket?.complete();
    this.socket = undefined;
    this.connectionStateSubject.next('closed');
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