import { Component } from '@angular/core';
import { PrimeImportsModule } from '../../../primeng-imports';

@Component({
  selector: 'app-error',
  imports: [PrimeImportsModule],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  url = 'https://google.com.mx';

  onRedireccionar() {
    window.location.href = this.url;
  }
}
