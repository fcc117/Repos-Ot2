import { Component } from '@angular/core';
import { Statswidget } from './components/statswidget/statswidget';

@Component({
  selector: 'app-dashboard',
  imports: [Statswidget],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
