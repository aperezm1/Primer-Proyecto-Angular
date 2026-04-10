import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SseDemoComponent } from '../../components/sse-demo/sse-demo.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, RouterModule, SseDemoComponent, FooterComponent, TranslatePipe],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {}