import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, FooterComponent, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  autor = 'Adrián Pérez Morales';

  ngAfterViewInit() {
    gsap.from('.welcome-message', {
      y: -50,
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
      onStart: () => console.log('Animación de bienvenida iniciada'),
      onUpdate: () => console.log('Animando bienvenida...'),
      onComplete: () => console.log('Animación de bienvenida finalizada')
    });

    gsap.from('.cards-container .card-link', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2
    });
  }
}