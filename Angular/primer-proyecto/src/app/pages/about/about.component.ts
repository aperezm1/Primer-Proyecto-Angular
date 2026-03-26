import { Component, inject, OnInit, signal, computed, effect } from '@angular/core';
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
  displayedColumns = ['id', 'username', 'email', 'phone'];

  private userService = inject(UserService);
  private router = inject(Router);

  users = signal<User[]>([]);
  filterText = signal('');
  filteredUsers = computed(() =>
    this.users().filter(user =>
      user.username.toLowerCase().includes(this.filterText().toLowerCase()) &&
      (this.selectedCity() === '' || user.address.city === this.selectedCity())
    )
  );
  cities = computed(() =>
    Array.from(new Set(this.users().map(user => user.address.city))).sort()
  );
  selectedCity = signal('');

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Error al obtener usuarios:', err)
    });
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterText.set(value);
  }

  onCityChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCity.set(value);
  }

  resetFilters() {
    this.filterText.set('');
    this.selectedCity.set('');
  }

  goToUserDetail(id: number): void {
    this.router.navigate(['/users', id]);
  }
}
