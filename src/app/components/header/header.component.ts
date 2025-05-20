import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule }                    from '@angular/common';
import { RouterModule }                    from '@angular/router';
import { CartService }                     from '../../services/cart.service';
import { Observable }                      from 'rxjs';
import { AuthService, ApiResponse }        from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
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
  }

  toggleMenuClick() {
    this.toggleMenu.emit();
  }

  /** Número de items en carrito */
  get itemCount(): number {
    return this.cartService.getItemCount();
  }
}
