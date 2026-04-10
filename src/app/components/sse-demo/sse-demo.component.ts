import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SseService } from '../../core/services/sse.service';
import { SseMessage } from '../../core/models/sse-message';

@Component({
  selector: 'app-sse-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sse-demo.component.html',
  styleUrl: './sse-demo.component.scss'
})
export class SseDemoComponent implements OnInit, OnDestroy {
  mensajes: SseMessage[] = [];
  estado = 'conectando...';
  private sseSub?: Subscription;

  constructor(private sseService: SseService) {}

  ngOnInit(): void {
    this.estado = 'conectando...';
    this.sseSub = this.sseService
      .connect('http://localhost:3001/events')
      .subscribe({
        next: (data) => {
          this.estado = 'conectado ✓';
          this.mensajes.unshift(data);
        },
        error: (err) => {
          this.estado = `error: ${err.message || 'conexión rechazada'}`;
          console.error('Error SSE:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.sseSub?.unsubscribe();
    this.estado = 'desconectado';
  }
}