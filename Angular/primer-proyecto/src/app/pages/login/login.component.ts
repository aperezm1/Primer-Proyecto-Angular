import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  private router = inject(Router);

  login(): void {
    if (this.username.trim() && this.password.trim()) {
      localStorage.setItem('token', 'demo-token');
      this.router.navigate(['/admin']);
      return;
    }

    this.error = 'Usuario y contraseña requeridos';
  }
}