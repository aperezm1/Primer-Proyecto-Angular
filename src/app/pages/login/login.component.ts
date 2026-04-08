import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DbJsonService } from '../../services/db-json.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { APP_ROUTES } from '../../constants/app-routes.constant';

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
  private authService = inject(AuthService);

  login(): void {
    if (this.username.trim() && this.password.trim()) {
      this.dbJsonService.login(this.username, this.password).subscribe({
        next: users => {
          if (users.length > 0) {
            this.authService.setToken(this.username);
            this.router.navigate([APP_ROUTES.admin]);
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