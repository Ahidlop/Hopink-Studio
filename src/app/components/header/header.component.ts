import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule }                    from '@angular/common';
import { RouterModule }                    from '@angular/router';
import { HttpClient }    from '@angular/common/http';
import { CartService }    from '../../services/cart.service';
import { Observable }                      from 'rxjs';

interface ApiResponse {
  status: 'success' | 'error';
  user?: { id: number; name: string; email: string };
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();

  /** Observable que emite la respuesta de sesión */
  user$: Observable<ApiResponse>;

  constructor(
    public cartService: CartService,
    private http: HttpClient
  ) {
    // Inicializamos el observable pero lo dispararemos en ngOnInit
    this.user$ = new Observable<ApiResponse>();
  }

  ngOnInit() {
    this.user$ = this.http.get<ApiResponse>(
      'http://localhost/Hopink-Studio/backend/getUser.php',
      { withCredentials: true }
    );
  }

  toggleMenuClick() {
    this.toggleMenu.emit();
  }
}
