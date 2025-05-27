// src/app/pages/shop-page/shop-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
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
  wishIds: number[] = [];
  public showToastProductId: number | null = null;
  toastMessage = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishIds = items.map(i => i.id);
    });
    this.wishlistService.loadWishlist();
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

  isInWishlist(id: number): boolean {
    return this.wishIds.includes(id);
  } 

  onAddToWishlist(productId: number) {
    this.wishlistService.addToWishlist(productId);
    // Mostramos solo aquí el toast
    this.showToastProductId = productId;
    this.toastMessage = 'Producto añadido a favoritos';
    setTimeout(() => this.showToastProductId = null, 3000);
  }
}
