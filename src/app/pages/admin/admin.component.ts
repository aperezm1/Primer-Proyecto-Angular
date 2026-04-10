import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-admin',
  imports: [TranslatePipe, RouterModule],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnDestroy {
  private breathingTween?: gsap.core.Tween;
  private mm = gsap.matchMedia();

  ngAfterViewInit() {
    this.mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)'
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        const titleY = isDesktop ? -50 : -25;
        const textY = isDesktop ? 50 : 25;
        const moveRange = isDesktop ? 30 : 15;
        const moveDivider = isDesktop ? 20 : 30;

        gsap.from('.admin-title', { y: titleY, opacity: 0, duration: 1 });
        gsap.from('.admin-text', { y: textY, opacity: 0, duration: 1, delay: 0.5 });

        this.breathingTween = gsap.to('.main-btn', {
          scale: isDesktop ? 1.08 : 1.05,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          paused: true
        });

        setTimeout(() => this.breathingTween?.play(), 1500);

        const xSetter = gsap.quickSetter('.main-btn', 'x', 'px');
        const clamp = gsap.utils.clamp(-moveRange, moveRange);

        const onMouseMove = (e: MouseEvent) => {
          const centeredX = (e.clientX - window.innerWidth / 2) / moveDivider;
          xSetter(clamp(centeredX));
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          this.breathingTween?.kill();
        };
      }
    );
  }

  playTimeline() {
    this.breathingTween?.play();
  }

  pauseTimeline() {
    this.breathingTween?.pause();
  }

  reverseTimeline() {
    this.breathingTween?.reversed(!this.breathingTween?.reversed());
  }

  ngOnDestroy(): void {
    this.mm.revert();
    this.breathingTween?.kill();
  }
}