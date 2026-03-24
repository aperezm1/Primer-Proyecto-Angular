import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appEnfocarInput]',
  standalone: true
})
export class EnfocarInputDirective implements AfterViewInit{
  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
