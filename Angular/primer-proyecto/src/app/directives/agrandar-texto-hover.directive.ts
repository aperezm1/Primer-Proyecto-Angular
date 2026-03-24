import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAgrandarTextoHover]'
})
export class AgrandarTextoHoverDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  agrandar() {
    this.el.nativeElement.style.fontSize = '2em';
  }

  @HostListener('mouseleave')
  normal() {
    this.el.nativeElement.style.fontSize = '';
  }
}
