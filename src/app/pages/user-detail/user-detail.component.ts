import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { APP_ROUTES } from '../../core/constants/app-routes.constant';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  
  user: User | null = null;
  loading = true;
  errorKey: string | null = null;
  routes = APP_ROUTES;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id)) {
      this.errorKey = 'USER_DETAIL.INVALID_ID';
      this.loading = false;
      return;
    }

    this.userService
      .getUserById(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.user = data;
        },
        error: () => {
          this.errorKey = 'USER_DETAIL.LOAD_ERROR';
        }
      });
  }
}