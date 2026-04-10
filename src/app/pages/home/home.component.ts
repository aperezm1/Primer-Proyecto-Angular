import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { REALTIME_ENDPOINTS } from '../../core/constants/realtime-endpoints.constant';
import { WsConnectionState } from '../../core/models/ws-connection-state';
import { WsMessage, WsMessageType } from '../../core/models/ws-message';
import { WebsocketChatService } from '../../core/services/websocket-chat.service';
import { formatEuropeanDateTime } from '../../core/utils/date-time.util';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, FooterComponent, TranslatePipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  author = 'Adrian Perez Morales';

  wsState: WsConnectionState = 'closed';
  chatInput = '';
  chatMessages: WsMessage[] = [];
  notifications: WsMessage[] = [];
  isChatOpen = false;

  private subscriptions = new Subscription();

  constructor(private websocketChatService: WebsocketChatService) {}

  ngOnInit(): void {
    this.websocketChatService.connect(REALTIME_ENDPOINTS.websocket);

    this.subscriptions.add(
      this.websocketChatService.connectionState$.subscribe((state) => {
        this.wsState = state;
      })
    );

    this.addTypeStream('chat', this.chatMessages);
    this.addTypeStream('notification', this.notifications);
    this.addTypeStream('status', this.notifications);
    this.addTypeStream('pong', this.notifications);
  }

  ngAfterViewInit(): void {
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

  closeChat(): void {
    this.isChatOpen = false;
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeChat();
    }
  }

  formatTimestamp(value: string | Date): string {
    return formatEuropeanDateTime(value);
  }

  getMessageText(msg: WsMessage): string {
    return msg.payload.text ?? '';
  }

  getMessageKey(msg: WsMessage): string | null {
    return msg.payload.textKey ?? null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.websocketChatService.close();
  }

  private addTypeStream(type: WsMessageType, target: WsMessage[]): void {
    this.subscriptions.add(
      this.websocketChatService.messagesByType(type).subscribe((msg) => {
        target.unshift(msg);
      })
    );
  }
}