import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from '../../services/wishlist.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentFilter: string = 'all';
  isLoading = true;

   searchTerm = '';

  showToastProductId: number | null = null;
  toastMessage = '';
  wishlistIds: number[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //Búsqueda
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q']?.trim().toLowerCase() || '';
      const urlFilter = params['filter'] || 'all';
      this.currentFilter = urlFilter;
      this.applyFilters();
    });

    //Cargo productos
    this.productService.getProducts().subscribe({
      next: products => {
        this.allProducts = products;
        this.applyFilters();  
        this.isLoading = false;
      },
      error: () => {this.isLoading = false}
    });

    // Cargo wishlist
    this.wishlistService.items$.subscribe(items => {
      this.wishlistIds = items.map(i => i.id);
    });

  }

  changeFilter(filter: string): void {
    this.currentFilter = filter;
    this.searchTerm = '';

    // Quitar el parámetro ?q= de la URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: null, filter },
      queryParamsHandling: 'merge'
  });

  // Aplicar solo el filtro de categoría
  this.applyFilters();
  }

   applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    if (term) {
      // búsqueda por nombre
      this.filteredProducts = this.allProducts
        .filter(p => p.name.toLowerCase().includes(term));
    } else {
      // filtrado por categoría
      this.filteredProducts = this.allProducts
        .filter(p => this.currentFilter === 'all' || p.category === this.currentFilter);
    }
  }

  addToCart(product: Product) {
    console.log('Añadiendo al carrito:', product);
    this.cartService.addToCart(product);
  }

  onAddToWishlist(productId: number): void {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: res => {
        // sólo si la petición fue 200 mostramos el toast
        this.showToastProductId = productId;
        this.toastMessage = 'Producto añadido a la lista de deseos';
        setTimeout(() => (this.showToastProductId = null), 2000);
      },
      error: err => {
        // si es 401 (no logueado), no hacemos nada y no hay toast
        if (err.status === 401) {
          alert('Debes iniciar sesión para usar la lista de deseos');
        }
      }
    });
  }

  isInWishlist(id: number): boolean {
    return this.wishlistIds.includes(id);
  }
}