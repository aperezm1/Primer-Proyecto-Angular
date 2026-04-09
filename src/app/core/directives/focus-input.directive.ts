import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocusInput]',
  standalone: true
})
export class FocusInputDirective implements AfterViewInit{
  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}