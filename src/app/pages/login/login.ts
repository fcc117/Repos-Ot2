import { Component } from '@angular/core';
import { PrimeImportsModule } from '../../primeng-imports';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ILoginForm } from './interfaces/ILoginForm';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AuthService } from '../../core/services/login/auth-service';
import { IEntLogin } from './interfaces/IEntLogin';
import { Router } from '@angular/router';
import { IUserData } from '../../core/interfaces/IUserData';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeImportsModule, Toast],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService],
})
export class Login {
  formLogin!: FormGroup<ILoginForm>;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  loading: boolean = false;
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
          const userData: IUserData = {
            fnNumeroEmpleado: response.data.fnNumeroEmpleado, // Asumiendo que vienen en response.data
            fcNombre: response.data.fcNombre,
            fcPuesto: response.data.fcPuesto,
            menu: response.objectlist,
            lstRolesUsuario: response.data.lstRolesUsuario,
          };

          const segundos = this.convertMinToSeg(response.expireIn);
          this.authService.setToken(response.accessToken, segundos);
          this.authService.setUserData(userData);
          this.router.navigate(['/inicio'], { replaceUrl: true });
        } else {
          if (response.codeError === '1') {
            localStorage.setItem('fcNumeroEmpleado', credenciales.UserName);
            this.router.navigate(['sesionexistente'], { replaceUrl: true });
          } else if (response.codeError === '2') {
            this.router.navigate(['perfilnoautorizado'], { replaceUrl: true });
          } else if (response.codeError === '3') {
            this.router.navigate(['sinacceso'], { replaceUrl: true });
          } else {
            this.showError(response.error || 'Credenciales incorrectas.');
          }
        }
      },
      error: (err) => {
        console.error('Error HTTP:', err);
        this.showError('Error de red o servidor. Intenta más tarde.');
        if (err.error.codeError === '4') {
          this.router.navigate(['error'], { replaceUrl: true });
        }
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
    const expireInSeconds = minutos * 10 * 60;
    return now + expireInSeconds;
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 300);
  }
}
