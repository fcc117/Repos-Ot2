import { Component } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';

@Component({
  selector: 'app-sinacceso',
  imports: [PrimeImportsModule],
  templateUrl: './sinacceso.html',
  styleUrl: './sinacceso.css',
})
export class Sinacceso {
  url = 'https://google.com.mx';

  onRedireccionar() {
    window.location.href = this.url;
  }
}
