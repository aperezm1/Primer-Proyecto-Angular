import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverEnlargeDirective } from '../../core/directives/hover-enlarge.directive';
import { CountClicksDirective } from '../../core/directives/count-clicks.directive';
import { FocusInputDirective } from '../../core/directives/focus-input.directive';
import { ShowIfRoleDirective } from '../../core/directives/show-if-role.directive';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslatePipe } from '@ngx-translate/core';
import {AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe} from '@angular/common';
import { GreetPipe } from '../../core/pipes/greet.pipe';
import { DoublePipe } from '../../core/pipes/double.pipe';
import { BoldPipe } from '../../core/pipes/bold.pipe';
import { AgePipe } from '../../core/pipes/age.pipe';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    AsyncPipe,
    TranslatePipe,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    SlicePipe,
    JsonPipe,
    GreetPipe,
    DoublePipe,
    BoldPipe,
    AgePipe
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent implements AfterViewInit, OnDestroy {
  selectedRole = 'admin';
  name = 'adrián pérez';
  currentDate = new Date();
  price = 1234.56;
  progress = 0.42;
  object = {
    name: 'Adrián',
    age: 25,
    active: true,
    roles: ['admin', 'user']
  };
  number = 5;
  birthDate = new Date(2000, 6, 3);

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray<HTMLElement>('.practice-page .section');

    sections.forEach((section) => {
      const cards = section.querySelectorAll('.card');

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}