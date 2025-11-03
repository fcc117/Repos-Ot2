import { Component } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';

@Component({
  selector: 'app-perfilnoautorizado',
  imports: [PrimeImportsModule],
  templateUrl: './perfilnoautorizado.html',
  styleUrl: './perfilnoautorizado.css',
})
export class Perfilnoautorizado {
  url = 'https://google.com.mx';

  onRedireccionar() {
    window.location.href = this.url;
  }
}
