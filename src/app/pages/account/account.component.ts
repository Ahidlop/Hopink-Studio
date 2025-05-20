<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, ApiResponse } from '../../services/auth/auth.service';
=======
// src/app/pages/account/account.component.ts
import { Component, OnInit }           from '@angular/core';
import { FormBuilder, FormGroup,
         ReactiveFormsModule }         from '@angular/forms';
import { HttpClient }                  from '@angular/common/http';
import { CommonModule }                from '@angular/common';

interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  user?: { id: number; name: string; email: string };
}
>>>>>>> Stashed changes

@Component({
  selector: 'app-account',
  standalone: true,
<<<<<<< Updated upstream
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  isLoggedIn = false;
  user: any = {};

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.getUser().subscribe(res => {
      if (res.status==='success' && res.user) {
        this.user = res.user;
        this.isLoggedIn = true;
      }
    });
  }

  login(email: string, password: string) {
    this.auth.login({email, password}).subscribe(res => {
      if (res.status==='success' && res.user) {
        this.user = res.user;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      } else {
        alert(res.message);
      }
    });
  }

  register(name: string, email: string, password: string) {
    this.auth.register({name,email,password}).subscribe(res => {
      alert(res.message);
    });
=======
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
    // 1) Creación de formularios
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });

    // 2) Verificar si hay sesión activa
    this.checkSession();
  }

  /** 2️⃣ Comprueba sesión llamando a getUser.php */
  checkSession() {
    this.http.get<ApiResponse>('backend/getUser.php')
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
>>>>>>> Stashed changes
  }

  /** 3️⃣ Login */
  login() {
    const { email, password } = this.loginForm.value;
    this.http.post<ApiResponse>('backend/login.php', { email, password })
      .subscribe({
        next: res => {
          if (res.status === 'success' && res.user) {
            this.isLoggedIn = true;
            this.user = res.user;
            // opcionalmente podrías limpiar el formulario:
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

  /** 4️⃣ Registro */
  register() {
    const { name, email, password } = this.registerForm.value;
    this.http.post<ApiResponse>('backend/register.php', { name, email, password })
      .subscribe({
        next: res => {
          if (res.status === 'success') {
            alert('Registro exitoso. Ahora inicia sesión.');
            // puedes incluso auto‐switch al login:
            // this.isShowingLogin = true;
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

  /** 5️⃣ Logout */
  logout() {
<<<<<<< Updated upstream
    this.auth.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.user = {};
      this.router.navigate(['/account']);
    });
=======
    this.http.get<ApiResponse>('backends/logout.php')
      .subscribe({
        next: () => {
          this.isLoggedIn = false;
          this.user = null;
        },
        error: err => {
          console.error('logout error', err);
        }
      });
>>>>>>> Stashed changes
  }
}
