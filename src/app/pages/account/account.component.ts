import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
  // Apunta directamente a tu servidor XAMPP
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
          this.user       = null;
        }
      },
      error: () => {
        this.isLoggedIn = false;
        this.user       = null;
      }
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.http.post<ApiResponse>(
      `${this.API}/login.php`,
      { email, password },
      { withCredentials: true }
    ).subscribe({
      next: res => {
        if (res.status === 'success' && res.user) {
          this.isLoggedIn = true;
          this.user       = res.user;
        } else {
          alert(res.message || 'Error al iniciar sesión');
        }
      },
      error: () => alert('Error de red al iniciar sesión')
    });
  }

  register() {
    const { name, email, password } = this.registerForm.value;
    this.http.post<ApiResponse>(
      `${this.API}/register.php`,
      { name, email, password },
      { withCredentials: true }
    ).subscribe({
      next: res => {
        if (res.status === 'success') {
          alert('Registro exitoso. Ahora confirma tu correo y luego inicia sesión.');
          this.registerForm.reset();
        } else {
          alert(res.message || 'Error al registrar');
        }
      },
      error: () => alert('Error de red al registrar')
    });
  }

  logout() {
    this.http.get<ApiResponse>(
      `${this.API}/logout.php`,
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.user       = null;
      },
      error: err => console.error('logout error', err)
    });
  }
}
