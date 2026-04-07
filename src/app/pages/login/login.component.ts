import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DbJsonService } from '../../services/db-json.service';

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
  private dbJsonService = inject(DbJsonService);

  login(): void {
    if (this.username.trim() && this.password.trim()) {
      this.dbJsonService.login(this.username, this.password).subscribe({
        next: users => {
          if (users.length > 0) {
            localStorage.setItem('token', this.username);
            this.router.navigate(['/admin']);
          } else {
            this.error = 'Usuario o contraseña incorrectos';
          }
        },
        error: () => {
          this.error = 'Error de conexión';
        }
      });
      
      return;
    }

    this.error = 'Usuario y contraseña requeridos';
  }
}