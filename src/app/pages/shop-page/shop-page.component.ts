import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentFilter: string = 'all';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.filteredProducts = products;
    });
  }

  changeFilter(filter: string): void {
    this.currentFilter = filter;
    this.filteredProducts = this.currentFilter === 'all'
      ? this.allProducts
      : this.allProducts.filter(p => p.category === this.currentFilter);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('Añadido al carrito:', product.name);
  }
  addToWishlist(product: Product): void {
    this.cartService.addToWishlist(product);
    console.log('Añadido a favoritos:', product.name);
  }
}
