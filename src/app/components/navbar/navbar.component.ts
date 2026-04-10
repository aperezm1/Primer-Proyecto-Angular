import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { APP_ROUTES } from '../../core/constants/app-routes.constant';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, TranslatePipe, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private languageService = inject(LanguageService);

  routes = APP_ROUTES;
  currentLang = this.languageService.getCurrentLang();
  private observer!: MutationObserver;
  private animatedLink?: HTMLElement;
  private animation?: gsap.core.Tween;

  ngAfterViewInit() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const animateActive = () => {
      const activeLink = navLinks.querySelector('.activo') as HTMLElement | null;

      if (this.animatedLink && this.animatedLink !== activeLink) {
        gsap.killTweensOf(this.animatedLink);
        gsap.set(this.animatedLink, { clearProps: 'transform' });
      }

      if (!activeLink) {
        this.animatedLink = undefined;
        this.animation?.kill();
        return;
      }

      if (this.animatedLink === activeLink) return;

      this.animation?.kill();
      gsap.set(activeLink, { clearProps: 'transform' });

      this.animatedLink = activeLink;
      this.animation = gsap.to(activeLink, {
        scale: 1.08,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    };

    this.observer = new MutationObserver(() => animateActive());
    this.observer.observe(navLinks, { attributes: true, subtree: true, attributeFilter: ['class'] });

    setTimeout(animateActive, 0);
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
    if (this.animation) this.animation.kill();
  }

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