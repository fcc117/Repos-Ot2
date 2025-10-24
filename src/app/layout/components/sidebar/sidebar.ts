import { Component, ElementRef } from '@angular/core';
import { Menu } from '../menu/menu';
@Component({
  selector: 'app-sidebar',
  imports: [Menu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: true,
})
export class Sidebar {
  constructor(public el: ElementRef) {}
}
