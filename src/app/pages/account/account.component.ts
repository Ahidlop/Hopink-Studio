import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  user?: { id: number; name: string; email: string };
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
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
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm    = this.fb.group({ email: [''], password: [''] });
    this.registerForm = this.fb.group({ name: [''], email: [''], password: [''] });
    this.checkSession();
  }

  private checkSession() {
    this.http.get<ApiResponse>(`${this.API}/getUser.php`, { withCredentials: true })
      .subscribe({
        next: res => {
          if (res.status === 'success' && res.user) {
            this.isLoggedIn = true;
            this.user       = res.user;
            // Si hay sesión, recarga el carrito
            this.cartService.loadCart();
          } else {
            this.isLoggedIn = false;
          }
        },
        error: () => {
          this.isLoggedIn = false;
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
          // Cargar carrito sin recargar toda la página
          this.cartService.loadCart();
          this.router.navigate(['/shopPage']);
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

  logout() {
    this.http.get<ApiResponse>(`${this.API}/logout.php`, { withCredentials: true })
      .subscribe(() => {
        this.isLoggedIn = false;
        this.user       = null;
        this.cartService.clearCart();
        this.router.navigate(['/shopPage']);
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
}
