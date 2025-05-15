import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.wishlist = this.cartService.getWishlist();
  }

  removeFromWishlist(id: number): void {
    this.cartService.removeFromWishlist(id);
    this.wishlist = this.cartService.getWishlist(); // actualizar vista
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.removeFromWishlist(product.id);
  }
}
