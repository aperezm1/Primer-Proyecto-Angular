import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  sent = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    comment: ['', [Validators.required, Validators.minLength(10)]]
  });

  send(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    gsap.to('.form-container', {
      y: 100,
      opacity: 0,
      duration: 1,
      onComplete: () => {
        this.sent = true;
        this.form.reset();
      }
    });

    console.log('Datos del formulario:', this.form.value);
  }
}