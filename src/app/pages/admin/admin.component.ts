import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-admin',
  imports: [TranslatePipe],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private breathingTween!: gsap.core.Tween;

  ngAfterViewInit() {
    gsap.from('.admin-title', { y: -50, opacity: 0, duration: 1 });
    gsap.from('.admin-text', { y: 50, opacity: 0, duration: 1, delay: 0.5 });

    this.breathingTween = gsap.to('.main-btn', {
      scale: 1.08,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      paused: true
    });

    setTimeout(() => this.breathingTween.play(), 1500);
  }

  playTimeline() {
    this.breathingTween.play();
  }

  pauseTimeline() {
    this.breathingTween.pause();
  }

  reverseTimeline() {
    this.breathingTween.reversed(!this.breathingTween.reversed());
  }
}