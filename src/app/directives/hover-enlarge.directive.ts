import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverEnlarge]',
  standalone: true
})
export class HoverEnlargeDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onEnter() {
    this.el.nativeElement.style.fontSize = '2em';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.style.fontSize = '';
  }
}