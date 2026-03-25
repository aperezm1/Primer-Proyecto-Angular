import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = true;
  error = '';

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id)) {
      this.loading = false;
      this.error = 'ID de usuario invalido.';
      return;
    }

    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el usuario.';
        this.loading = false;
      }
    });
  }
}