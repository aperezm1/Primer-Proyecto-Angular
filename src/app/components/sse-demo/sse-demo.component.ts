import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { SseService } from '../../core/services/sse.service';
import { SseMessage } from '../../core/models/sse-message';

@Component({
  selector: 'app-sse-demo',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './sse-demo.component.html',
  styleUrl: './sse-demo.component.scss'
})
export class SseDemoComponent implements OnInit, OnDestroy {
  mensajes: SseMessage[] = [];
  estado = 'SSE.STATUS_CONNECTING';
  private sseSub?: Subscription;

  constructor(private sseService: SseService) {}

  ngOnInit(): void {
    this.estado = 'SSE.STATUS_CONNECTING';

    this.sseSub = this.sseService.connect('http://localhost:3001/events').subscribe({
      next: (data) => {
        this.estado = 'SSE.STATUS_CONNECTED';
        this.mensajes.unshift(data);
      },
      error: (err) => {
        this.estado = 'SSE.STATUS_ERROR';
        console.error('Error SSE:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.sseSub?.unsubscribe();
    this.estado = 'SSE.STATUS_DISCONNECTED';
  }
}