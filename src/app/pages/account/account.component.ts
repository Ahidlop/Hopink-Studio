// src/app/pages/account/account.component.ts
import { Component, OnInit }           from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient }                  from '@angular/common/http';
import { CommonModule }                from '@angular/common';

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
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoggedIn = false;
  user: { id: number; name: string; email: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // 1) Crear los formularios
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });

    // 2) Comprobar sesión activa
    this.checkSession();
  }

  /** Comprueba si hay sesión llamando a getUser.php */
  checkSession() {
    this.http.get<ApiResponse>('/backend/getUser.php')
      .subscribe({
        next: res => {
          if (res.status === 'success' && res.user) {
            this.isLoggedIn = true;
            this.user = res.user;
          } else {
            this.isLoggedIn = false;
            this.user = null;
          }
        },
        error: err => {
          console.error('checkSession error', err);
          this.isLoggedIn = false;
          this.user = null;
        }
      });
  }

  /** Iniciar sesión */
  login() {
    const { email, password } = this.loginForm.value;
    this.http.post<ApiResponse>('backend/login.php', { email, password })
      .subscribe({
        next: res => {
          if (res.status === 'success' && res.user) {
            this.isLoggedIn = true;
            this.user = res.user;
            // this.loginForm.reset();
          } else {
            alert(res.message || 'Error al iniciar sesión');
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
    this.http.post<ApiResponse>('backend/register.php', { name, email, password })
      .subscribe({
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
    this.http.get<ApiResponse>('backend/logout.php')
      .subscribe({
        next: () => {
          this.isLoggedIn = false;
          this.user = null;
        },
        error: err => {
          console.error('logout error', err);
        }
      });
  }
}
