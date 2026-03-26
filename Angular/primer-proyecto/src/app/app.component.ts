import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'primer-proyecto';
  
  private translate = inject(TranslateService);

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang') || 'es';
    this.translate.use(savedLang);
  }
}