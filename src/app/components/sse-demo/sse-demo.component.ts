import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { REALTIME_ENDPOINTS } from '../../core/constants/realtime-endpoints.constant';
import { SseMessage } from '../../core/models/sse-message';
import { SseService } from '../../core/services/sse.service';
import { formatEuropeanDateTime } from '../../core/utils/date-time.util';

@Component({
  selector: 'app-sse-demo',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './sse-demo.component.html',
  styleUrl: './sse-demo.component.scss'
})
export class SseDemoComponent implements OnInit, OnDestroy {
  messages: SseMessage[] = [];
  statusKey = 'SSE.STATUS_CONNECTING';
  private sseSubscription?: Subscription;

  constructor(private sseService: SseService) {}

  ngOnInit(): void {
    this.statusKey = 'SSE.STATUS_CONNECTING';

    this.sseSubscription = this.sseService.connect(REALTIME_ENDPOINTS.sse).subscribe({
      next: (data) => {
        this.statusKey = 'SSE.STATUS_CONNECTED';
        this.messages.unshift(data);
      },
      error: (error) => {
        this.statusKey = 'SSE.STATUS_ERROR';
        console.error('SSE error:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.sseSubscription?.unsubscribe();
    this.statusKey = 'SSE.STATUS_DISCONNECTED';
  }

  formatTimestamp(value: string | Date): string {
    return formatEuropeanDateTime(value);
  }
}