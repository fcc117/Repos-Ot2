import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-grid',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-grid.html',
  styleUrl: './skeleton-grid.css',
})
export class SkeletonGridComponent {
  @Input() count: number = 5;
  @Input() iconSize: string = '2.5rem';
  @Input() cols: string = 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4';

  get skeletons() {
    return Array.from({ length: this.count });
  }

  get gridClass() {
    return `grid ${this.cols}`;
  }
}
