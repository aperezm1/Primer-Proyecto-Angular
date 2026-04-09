import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'greet',
  standalone: true
})
export class GreetPipe implements PipeTransform {
  translateService = inject(TranslateService);

  transform(name: string): Observable<string> {
    return this.translateService.stream('PRACTICE.PIPES_CUSTOM.GREET_TEXT', { name });
  }
}