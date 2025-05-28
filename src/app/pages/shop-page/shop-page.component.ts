import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from '../../services/wishlist.service';

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

  showToastProductId: number | null = null;
  toastMessage = '';
  wishlistIds: number[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {

    //Cargo productos
    this.productService.getProducts().subscribe({
      next: products => {
        this.allProducts = products;
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error cargando productos', err);
        this.isLoading = false;
      }
    });

    this.wishlistService.items$.subscribe(items => {
      this.wishlistIds = items.map(i => i.id);
    });
  }

  changeFilter(filter: string): void {
    this.currentFilter = filter;
    this.filteredProducts = filter === 'all'
      ? this.allProducts
      : this.allProducts.filter(p => p.category === filter);
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