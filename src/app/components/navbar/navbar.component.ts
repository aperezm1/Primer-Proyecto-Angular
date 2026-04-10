import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { gsap } from 'gsap';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { APP_ROUTES } from '../../core/constants/app-routes.constant';

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

  @ViewChild('navLinks', { static: true }) navLinksRef?: ElementRef<HTMLElement>;

  routes = APP_ROUTES;
  currentLang = this.languageService.getCurrentLang();

  private routerSubscription?: Subscription;
  private animatedLink?: HTMLElement;
  private activeTween?: gsap.core.Tween;

  ngAfterViewInit(): void {
    this.animateActiveLink();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.animateActiveLink());
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.activeTween?.kill();

    if (this.animatedLink) {
      gsap.set(this.animatedLink, { clearProps: 'transform' });
    }
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

  private animateActiveLink(): void {
    const navLinks = this.navLinksRef?.nativeElement;
    if (!navLinks) return;

    const activeLink = navLinks.querySelector('.activo') as HTMLElement | null;

    if (!activeLink) {
      this.stopPreviousAnimation();
      this.animatedLink = undefined;
      return;
    }

    if (this.animatedLink === activeLink) {
      return;
    }

    this.stopPreviousAnimation();
    this.animatedLink = activeLink;

    this.activeTween = gsap.to(activeLink, {
      scale: 1.08,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }

  private stopPreviousAnimation(): void {
    if (this.animatedLink) {
      gsap.killTweensOf(this.animatedLink);
      gsap.set(this.animatedLink, { clearProps: 'transform' });
    }

    this.activeTween?.kill();
    this.activeTween = undefined;
  }
}