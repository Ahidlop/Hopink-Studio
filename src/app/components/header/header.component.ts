import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule }                            from '@angular/common';
import { RouterModule, Router, NavigationEnd }     from '@angular/router';
import { HttpClient }                              from '@angular/common/http';
import { CartService }                             from '../../services/cart.service';
import { Observable }                              from 'rxjs';
import { filter }                                  from 'rxjs/operators';

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

  /** Observable que siempre apunta al último getUser.php */
  user$: Observable<ApiResponse>;

  private readonly API = 'http://localhost/Hopink-Studio/backend';

  constructor(
    public cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {
    // petición inicial
    this.user$ = this.fetchSession();
  }

  ngOnInit() {
    // cada vez que termine una navegación, vuelve a llamar a getUser.php
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.user$ = this.fetchSession();
      });
  }

  toggleMenuClick() {
    this.toggleMenu.emit();
  }

  private fetchSession(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.API}/getUser.php`,
      { withCredentials: true }
    );
  }
}
