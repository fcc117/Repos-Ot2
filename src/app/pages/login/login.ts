import { Component } from '@angular/core';
import { PrimeImportsModule } from '../../primeng-imports';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ILoginForm } from './interfaces/ILoginForm';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AuthService } from '../../core/services/auth-service';
import { IEntLogin } from './interfaces/IEntLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeImportsModule, Toast],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService],
})
export class Login {
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  formLogin!: FormGroup<ILoginForm>;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/inicio']); // o '/dashboard' según tu ruta
      return;
    }

    this.formLogin = this.fb.group({
      UserName: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      this.showError('Formulario inválido. Verifica los campos.');
      return;
    }

    const credenciales = this.formLogin.value as IEntLogin;

    this.authService.login(credenciales.UserName, credenciales.Password).subscribe({
      next: (response) => {
        if (response.exito) {
          const segundos = this.convertMinToSeg(response.expireIn);
          this.authService.setToken(response.accessToken, segundos);
          this.router.navigate(['/inicio'], { replaceUrl: true });
        } else {
          this.showError(response.error || 'Credenciales incorrectas.');
        }
      },
      error: (err) => {
        console.error('Error HTTP:', err);
        this.showError('Error de red o servidor. Intenta más tarde.');
      },
    });
  }

  showError(mensaje: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error de inicio de sesión',
      detail: mensaje,
      life: 4000,
    });
  }

  convertMinToSeg(minutos: number) {
    const now = Math.floor(Date.now() / 1000);
    const expireInSeconds = minutos * 60;
    return now + expireInSeconds;
  }
}
