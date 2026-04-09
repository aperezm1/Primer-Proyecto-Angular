import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCountClicks]',
  standalone: true
})
export class CountClicksDirective {
  private counter = 0;
  
  constructor(private el: ElementRef) {}

  @HostListener('click')
  count() {
    this.counter++;
    this.el.nativeElement.textContent = `Clicks: ${this.counter}`;
  }
}