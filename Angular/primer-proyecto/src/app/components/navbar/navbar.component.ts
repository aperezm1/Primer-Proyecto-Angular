import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, TranslatePipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private translate = inject(TranslateService);
  private router = inject(Router);

  currentLang = localStorage.getItem('lang') || 'es';

  get isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  changeLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}