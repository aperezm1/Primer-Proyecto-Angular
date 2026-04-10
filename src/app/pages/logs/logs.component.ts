import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SseDemoComponent } from '../../components/sse-demo/sse-demo.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, RouterModule, SseDemoComponent, FooterComponent],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {}