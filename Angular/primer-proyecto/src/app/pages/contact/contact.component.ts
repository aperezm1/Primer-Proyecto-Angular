import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  enviado = false;

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviado = true;
    console.log('Datos del formulario:', this.form.value);
    this.form.reset();
  }
}