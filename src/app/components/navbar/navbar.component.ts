import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { APP_ROUTES } from '../../constants/app-routes.constant';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, TranslatePipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private languageService = inject(LanguageService);
  
  routes = APP_ROUTES;
  currentLang = this.languageService.getCurrentLang();

  changeLang(lang: string): void {
    this.currentLang = lang;
    this.languageService.setLang(lang);
  }

  goToLogin(): void {
    this.router.navigate([this.routes.login]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([this.routes.home]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}