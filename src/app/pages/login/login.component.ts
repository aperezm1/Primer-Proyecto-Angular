import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DbJsonService } from '../../services/db-json.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
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
            this.error = 'LOGIN.ERROR_INVALID';
          }
        },
        error: () => {
          this.error = 'LOGIN.ERROR_CONNECTION';
        }
      });
      
      return;
    }

    this.error = 'LOGIN.ERROR_REQUIRED';
  }
}