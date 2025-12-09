import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PrimeImportsModule } from '../../../primeng-imports';

@Component({
  selector: 'app-ticketdetalle',
  imports: [PrimeImportsModule],
  templateUrl: './ticketdetalle.html',
  styleUrl: './ticketdetalle.css',
})
export class Ticketdetalle {
  folio: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerIdDeRuta();
  }

  obtenerIdDeRuta(): void {
    this.folio = this.route.snapshot.paramMap.get('id');
  }
}
