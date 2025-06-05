import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService, SimpleProduct } from '../../services/wishlist.service';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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

  //Login y registro
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoggedIn = false;
  user: ApiResponse['user'] | null = null;

  // Presupuestos
  budgets: any[] = [];
  selectedBudget: any = null;
  showConfirmDelete = false;
  public wishlist: SimpleProduct[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cartService: CartService,
    private router: Router,
    private wishlistService: WishlistService,
    private scroller: ViewportScroller,
    private route: ActivatedRoute //Para deslizar
  ) {}

  ngOnInit() {
    this.loginForm    = this.fb.group({ email: [''], password: [''] });
    this.registerForm = this.fb.group({ name: [''], email: [''], password: [''] });
    this.checkSession();

    this.wishlistService.loadWishlist();
    this.wishlistService.wishlist$.subscribe(items => this.wishlist = items);
  }


  private checkSession() {
    this.http.get<ApiResponse>(`${this.API}/getUser.php`, { withCredentials: true })
      .subscribe({
        next: res => {
          if (res.status === 'success' && res.user) {
            this.isLoggedIn = true;
            this.user       = res.user;
            this.cartService.loadCart();
            this.loadBudgets(); // Carga presupuestos
          } else {
            this.isLoggedIn = false;
          }
        },
        error: () => {
          this.isLoggedIn = false;
        }
      });
  }

  loadBudgets(): void {
    const email = this.user?.email;
    if (!email) return;

    this.http.post('http://localhost/Hopink-Studio/backend/get_budgets.php', { email })
      .subscribe({
        next: (res: any) => {
          if (res.ok) {
            this.budgets = res.budgets;
          } else {
            console.error('Presupuestos no cargados correctamente');
          }
        },
        error: err => {
          console.error('Error al cargar presupuestos', err);
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
         this.cartService.loadCart();
         this.loadBudgets();
         this.router.navigate(
           ['/account'],
           { fragment: 'wishlist' }
         );
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
        this.budgets    = []; 
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
        if (err.status === 409) {
          // El backend devuelve "409 xq Email ya registrado"
          alert('Email ya registrado');
        } else {
          alert('Error de red al registrar');
        }
      }
    });
  }

  //Tras login
  scrollTo(anchor: string): void {
    this.scroller.scrollToAnchor(anchor);
  }
  
  //Presupuestos	
  getServiceLabel(service: string): string {
  switch (service) {
    case 'color': return 'Tatuaje a color';
    case 'black': return 'Tatuaje blanco y negro';
    case 'piercing': return 'Piercing';
    default: return service;
  }
}

getBasePrice(artist: string): number {
  switch (artist.toLowerCase()) {
    case 'alejandra':
    case 'pedro':
      return 80;
    case 'raul':
    case 'fernando':
      return 70;
    case 'aprendiz':
      return 40;
    default:
      return 60;
  }
}

getEstimatedHours(height: number, width: number): number {
  const area = height * width;
  if (area <= 100) return 1;
  if (area <= 300) return 2;
  if (area <= 600) return 3;
  return 4; // ajusta según tu criterio
}

getTotalPrice(service: string, artist: string, height: number, width: number): number {
  if (service === 'piercing' && artist.toLowerCase() === 'aprendiz') {
    return 15;
  }
  else if(service=== 'piercing' && artist.toLowerCase()!=='aprendiz'){
    return 30;
  }
  else{
    const base = this.getBasePrice(artist);
    const hours = this.getEstimatedHours(height, width);
    const colorSupplement = service === 'color' ? 30 : 0;
    return base * hours + colorSupplement;
  }
}

confirmDelete(budget: any) {
  this.selectedBudget = budget;
  this.showConfirmDelete = true;
}

cancelDelete() {
  this.selectedBudget = null;
  this.showConfirmDelete = false;
}

deleteBudget() {
  if (!this.selectedBudget?.id) return;

  this.http.post('http://localhost/Hopink-Studio/backend/delete_budget.php', {
    id: this.selectedBudget.id
  }).subscribe({
    next: (res: any) => {
      if (res.ok) {
        this.budgets = this.budgets.filter(b => b.id !== this.selectedBudget.id);
        this.showConfirmDelete = false;
      }
    },
    error: err => {
      console.error('Error al eliminar presupuesto', err);
    }
  });
}

//Añadir al carrito desde wishlist
  addToCart(product: SimpleProduct): void {
    this.cartService.addToCart({ id: product.id });
    this.showCartMessage = true;
    setTimeout(() => {
      this.showCartMessage = false;
    }, 2500); // desaparece en 2.5 segundos
  }

  confirmWishlistId: number | null = null;

removeFromWishlist(id: number) {
  this.confirmWishlistId = id; // mostrar confirmación
}

confirmRemoveWishlist() {
  if (this.confirmWishlistId !== null) {
    this.wishlist = this.wishlist.filter(p => p.id !== this.confirmWishlistId);
    this.confirmWishlistId = null;
  }
}

cancelRemoveWishlist() {
  this.confirmWishlistId = null;
}

  showCartMessage = false;
}
