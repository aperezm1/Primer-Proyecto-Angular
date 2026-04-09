import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appShowIfRole]',
  standalone: true
})
export class ShowIfRoleDirective {
  private currentRole = 'admin';

  constructor(private el: ElementRef) {}

  @Input('appShowIfRole') set requiredRole(role: string) {
    this.el.nativeElement.style.display = role === this.currentRole ? '' : 'none';
  }
}