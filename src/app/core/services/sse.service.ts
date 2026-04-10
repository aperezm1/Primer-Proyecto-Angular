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
            const parsed = JSON.parse(messageEvent.data) as SseMessage;
            this.ngZone.run(() => observer.next(parsed));
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