// src/app/pages/account/account.component.ts
import { Component, OnInit }           from '@angular/core';
import { FormBuilder, FormGroup }      from '@angular/forms';
import { HttpClient }                  from '@angular/common/http';
import { CommonModule }                from '@angular/common';
import { ReactiveFormsModule }         from '@angular/forms';
import { environment } from '../../../environments/environment';

interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  user?: { id: number; name: string; email: string };
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private readonly API = 'http://localhost/Hopink-Studio/backend';

  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoggedIn = false;
  user: ApiResponse['user'] | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm    = this.fb.group({ email: [''], password: [''] });
    this.registerForm = this.fb.group({ name: [''], email: [''], password: [''] });
    this.checkSession();
  }

  /** Comprueba sesión activa */
  checkSession() {
    this.http.get<ApiResponse>(
      `${this.API}/getUser.php`,
      { withCredentials: true }
    ).subscribe({
      next: res => {
        if (res.status === 'success' && res.user) {
          this.isLoggedIn = true;
          this.user       = res.user;
        } else {
          this.isLoggedIn = false;
        }
      },
      error: () => {
        this.isLoggedIn = false;
      }
    });
  }

  /** Iniciar sesión */
  login() {
    const { email, password } = this.loginForm.value;
    const url = `${this.API}/login.php`;
    console.log('LOGIN →', url);
    return this.http.post<ApiResponse>( 
      url,   
      { email, password },
      { withCredentials: true }
    ).subscribe({
      next: res => {
        if (res.status === 'success' && res.user) {
          this.isLoggedIn = true;
          this.user       = res.user;
          this.loginForm.reset();
          window.location.reload();
        } else {
          alert(res.message || 'Email o contraseña incorrectos');
        }
      },
      error: err => {
        console.error('login error', err);
        alert('Error de red al iniciar sesión');
      }
    });
  }

  /** Registrarse */
  register() {
    const { name, email, password } = this.registerForm.value;
    this.http.post<ApiResponse>(
      `${this.API}/register.php`,
      { name, email, password },
      { withCredentials: true }
    ).subscribe({
      next: res => {
        if (res.status === 'success') {
          alert('Registro exitoso. Ahora inicia sesión.');
          this.registerForm.reset();
        } else {
          alert(res.message || 'Error al registrar');
        }
      },
      error: err => {
        console.error('register error', err);
        alert('Error de red al registrar');
      }
    });
  }

  /** Cerrar sesión */
  logout() {
    this.http.get<ApiResponse>(
      `${this.API}/logout.php`,
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.user       = null;
        // FORZAR refresco de la SPA para que el header re-ejecute su check
        window.location.reload();
      },
      error: err => {
        console.error('logout error', err);
      }
    });
  }
}