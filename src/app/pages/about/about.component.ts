import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { APP_ROUTES } from '../../constants/app-routes.constant';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatTableModule, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  
  displayedColumns = ['id', 'username', 'email', 'phone'];
  users = signal<User[]>([]);
  filterText = signal('');
  selectedCity = signal('');
  routes = APP_ROUTES;

  filteredUsers = computed(() =>
    this.users().filter(
      user =>
        user.username.toLowerCase().includes(this.filterText().toLowerCase()) &&
        (this.selectedCity() === '' || user.address.city === this.selectedCity())
    )
  );

  cities = computed(() =>
    Array.from(new Set(this.users().map(user => user.address.city))).sort()
  );

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => this.users.set(data),
      error: err => console.error('Error al obtener usuarios:', err)
    });
  }

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterText.set(value);
  }

  onCityChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCity.set(value);
  }

  resetFilters(): void {
    this.filterText.set('');
    this.selectedCity.set('');
  }

  goToUserDetail(id: number): void {
    this.router.navigate([this.routes.users, id]);
  }
}