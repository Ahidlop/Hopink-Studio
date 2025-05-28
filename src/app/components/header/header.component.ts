import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule }                            from '@angular/common';
import { RouterModule, Router, NavigationEnd }     from '@angular/router';
import { HttpClient, HttpClientModule }            from '@angular/common/http';
import { CartService }                             from '../../services/cart.service';
import { filter }                                  from 'rxjs/operators';
import { Observable }                              from 'rxjs';
import { FormsModule } from '@angular/forms';

interface ApiResponse {
  status: 'success' | 'error';
  user?: { id: number; name: string; email: string };
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();

  searchTerm = '';
  public itemCount = 0;
  public user$!: Observable<ApiResponse>;

  private readonly API = 'http://localhost/Hopink-Studio/backend';

  constructor(
    public cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Cargar carrito al arrancar
    this.cartService.loadCart();
    this.cartService.cart$
      .subscribe(items => {
        this.itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      });

    //Petición cargar sesión
    this.loadSession();

    //Al cambiar de ruta, volvemos a cargar la sesión
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.loadSession());
  }

  toggleMenuClick(): void {
    this.toggleMenu.emit();
  }

  onSearch(): void {
    const term = this.searchTerm.trim();
    this.router.navigate(['/shopPage'], { queryParams: { q: term } });
  }

  onSearchLive(): void {
    const term = this.searchTerm.trim();
    this.router.navigate(['/shopPage'], {
      queryParams: { q: term },
      queryParamsHandling: 'merge'
    });
  }

  private loadSession(): void {
    this.user$ = this.http.get<ApiResponse>(
      `${this.API}/getUser.php`,
      { withCredentials: true }
    );
  }
}
