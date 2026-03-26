import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = true;
  errorKey: string | null = null;

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id)) {
      this.loading = false;
      this.errorKey = 'USER_DETAIL.INVALID_ID';
      return;
    }

    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.errorKey = 'USER_DETAIL.LOAD_ERROR';
        this.loading = false;
      }
    });
  }
}