import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMostrarElementoSiRol]'
})
export class MostrarElementoSiRolDirective {
  private rolActual = 'admin';

  constructor(private el: ElementRef) {}

  @Input('appMostrarSiRol') set rolRequerido(rol: string) {
    if (rol !== this.rolActual) {
      this.el.nativeElement.style.display = 'none';
    } else {
      this.el.nativeElement.style.display = '';
    }
  }
}
