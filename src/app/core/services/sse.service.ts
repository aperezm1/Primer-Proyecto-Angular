import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { SseMessage } from '../models/sse-message';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  constructor(private ngZone: NgZone) {}

  connect(url: string): Observable<SseMessage> {
    return new Observable<SseMessage>((observer) => {
      const eventSource = new EventSource(url);

      this.ngZone.runOutsideAngular(() => {
        eventSource.addEventListener('progress', (event: Event) => {
          try {
            const messageEvent = event as MessageEvent;
            const parsed = JSON.parse(messageEvent.data) as Partial<SseMessage>;

            if (!parsed.timestamp || !parsed.messageKey) {
              return;
            }

            this.ngZone.run(() =>
              observer.next({
                timestamp: String(parsed.timestamp),
                messageKey: String(parsed.messageKey),
                value: Number(parsed.value ?? 0)
              })
            );
          } catch (parseError) {
            this.ngZone.run(() => observer.error(parseError));
          }
        });

        eventSource.onerror = (error) => {
          this.ngZone.run(() => observer.error(error));
          eventSource.close();
        };
      });

      return () => {
        eventSource.close();
      };
    });
  }
}