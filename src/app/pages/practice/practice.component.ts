import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverEnlargeDirective } from '../../core/directives/hover-enlarge.directive';
import { CountClicksDirective } from '../../core/directives/count-clicks.directive';
import { FocusInputDirective } from '../../core/directives/focus-input.directive';
import { ShowIfRoleDirective } from '../../core/directives/show-if-role.directive';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    FormsModule,
    HoverEnlargeDirective,
    CountClicksDirective,
    FocusInputDirective,
    ShowIfRoleDirective,
    FooterComponent,
    TranslatePipe,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    SlicePipe,
    JsonPipe
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent {
  // Directives data
  selectedRole = 'admin';

  // Pipes data
  nombre = 'adrián pérez';
  fechaActual = new Date();
  precio = 1234.56;
  progreso = 0.42;
  texto = 'Angular es un framework de desarrollo web muy potente.';
  objeto = {
    nombre: 'Adrián',
    edad: 25,
    activo: true,
    roles: ['admin', 'user']
  };
}