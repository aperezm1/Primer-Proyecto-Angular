import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  users: User[] = [];
  displayedColumns = ['id', 'username', 'email', 'phone'];

  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error al obtener usuarios:', err)
    });
  }

  goToUserDetail(id: number): void {
    this.router.navigate(['/users', id]);
  }
}
