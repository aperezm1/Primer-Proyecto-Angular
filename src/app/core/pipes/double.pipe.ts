import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'double',
  standalone: true
})
export class DoublePipe implements PipeTransform {
  transform(number: number): number {
    return number * 2;
  }
}