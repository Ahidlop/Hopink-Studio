// src/app/pages/shop-page/shop-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
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

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  addToWishlist(product: Product): void {
    this.cartService.addToWishlist(product);
  }
}
