import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingService } from './services/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SpinnerComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'primer-proyecto';
  
  private translate = inject(TranslateService);
  loadingService = inject(LoadingService);

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang') || 'es';
    this.translate.use(savedLang);
  }
}