<<<<<<< HEAD
import { Directive, ElementRef, HostListener } from '@angular/core';
=======
import { Directive } from '@angular/core';
>>>>>>> 34b31432b11b91b0232d3bb9a5472536329e2c89

@Directive({
  selector: '[appContarClicks]'
})
export class ContarClicksDirective {
<<<<<<< HEAD
  private contador = 0;
  
  constructor(private el: ElementRef) {}

  @HostListener('click')
  contar() {
    this.contador++;
    this.el.nativeElement.textContent = `Clicks: ${this.contador}`;
  }
=======

  constructor() { }

>>>>>>> 34b31432b11b91b0232d3bb9a5472536329e2c89
}
