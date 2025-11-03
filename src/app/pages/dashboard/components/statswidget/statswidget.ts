import { Component, Input } from '@angular/core';
import { ITotalesTicket } from '../../interfaces/ITotalesTicket';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  standalone: true,
  selector: 'app-statswidget',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './statswidget.html',
  styleUrl: './statswidget.css',
})
export class Statswidget {
  @Input() totales: ITotalesTicket[] = [];
  @Input() isLoading: boolean = false;
}
