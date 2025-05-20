<<<<<<< Updated upstream
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule }                    from '@angular/common';
import { RouterModule }                    from '@angular/router';
import { CartService }                     from '../../services/cart.service';
import { Observable }                      from 'rxjs';
import { AuthService, ApiResponse }        from '../../services/auth/auth.service';
=======
// src/app/components/header/header.component.ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterModule }    from '@angular/router';
import { HttpClient }      from '@angular/common/http';
import { CartService }     from '../../services/cart.service';

interface ApiResponse {
  status: 'success' | 'error';
  user?: { id: number; name: string; email: string };
}
>>>>>>> Stashed changes

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
<<<<<<< Updated upstream
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  /** Observable que emite el estado de sesión */
  user$!: Observable<ApiResponse>;

  constructor(
    public cartService: CartService,
    private auth: AuthService
  ) {
    // ← aquí ya auth está inicializado
    this.user$ = this.auth.getUser();
=======
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: { id: number; name: string; email: string } | null = null;
  @Output() toggleMenu = new EventEmitter<void>();

  constructor(
    public cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<ApiResponse>('backends/getUser.php')
      .subscribe({
        next: res => {
          this.isLoggedIn = res.status === 'success';
          // asignamos el user si viene en la respuesta
          this.user = res.user ?? null;
        },
        error: err => {
          console.error('Error al comprobar sesión', err);
          this.isLoggedIn = false;
          this.user = null;
        }
      });
>>>>>>> Stashed changes
  }

  toggleMenuClick() {
    this.toggleMenu.emit();
  }
<<<<<<< Updated upstream

  /** Número de items en carrito */
  get itemCount(): number {
    return this.cartService.getItemCount();
  }
=======
>>>>>>> Stashed changes
}
