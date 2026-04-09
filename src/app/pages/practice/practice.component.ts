import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverEnlargeDirective } from '../../core/directives/hover-enlarge.directive';
import { CountClicksDirective } from '../../core/directives/count-clicks.directive';
import { FocusInputDirective } from '../../core/directives/focus-input.directive';
import { ShowIfRoleDirective } from '../../core/directives/show-if-role.directive';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslatePipe } from '@ngx-translate/core';

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
    TranslatePipe
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent {
  selectedRole = 'admin';
}