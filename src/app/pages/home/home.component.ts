import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { gsap } from 'gsap';
import { WebsocketChatService } from '../../core/services/websocket-chat.service';
import { WsConnectionState } from '../../core/models/ws-connection-state';
import { WsMessage } from '../../core/models/ws-message';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, FooterComponent, TranslatePipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  autor = 'Adrian Perez Morales';

  wsState: WsConnectionState = 'closed';
  chatInput = '';
  chatMessages: WsMessage[] = [];
  notifications: WsMessage[] = [];
  chatOpen = false;

  private subscriptions = new Subscription();

  constructor(private websocketChatService: WebsocketChatService) { }

  ngOnInit(): void {
    this.websocketChatService.connect('ws://localhost:3002');

    this.subscriptions.add(
      this.websocketChatService.connectionState$.subscribe((state) => {
        this.wsState = state;
      })
    );

    this.subscriptions.add(
      this.websocketChatService.messagesByType('chat').subscribe((msg) => {
        this.chatMessages.unshift(msg);
      })
    );

    this.subscriptions.add(
      this.websocketChatService.messagesByType('notification').subscribe((msg) => {
        this.notifications.unshift(msg);
      })
    );

    this.subscriptions.add(
      this.websocketChatService.messagesByType('pong').subscribe((msg) => {
        this.notifications.unshift({
          ...msg,
          payload: { text: 'PONG recibido' }
        });
      })
    );

    this.subscriptions.add(
      this.websocketChatService.messagesByType('status').subscribe((msg) => {
        this.notifications.unshift(msg);
      })
    );
  }

  ngAfterViewInit() {
    gsap.from('.welcome-message', {
      y: -50,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    });

    gsap.from('.cards-container .card-link', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2
    });
  }

  sendMessage(): void {
    const text = this.chatInput.trim();
    if (!text) return;

    this.websocketChatService.sendChat(text);
    this.chatInput = '';
  }

  sendPing(): void {
    this.websocketChatService.sendPing();
  }

  openChat(): void {
    this.chatOpen = true;
  }

  closeChat(): void {
    this.chatOpen = false;
  }

  toggleChat(): void {
    this.chatOpen = !this.chatOpen;
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeChat();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.websocketChatService.close();
  }
}