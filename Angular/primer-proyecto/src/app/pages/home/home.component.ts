import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, FooterComponent, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  autor = 'Adrián Pérez Morales';
}