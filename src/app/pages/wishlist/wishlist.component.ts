import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { WishlistService, SimpleProduct } from '../../services/wishlist.service';
import { CartService }       from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  public wishlist: SimpleProduct[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.wishlistService.loadWishlist();
    this.wishlistService.wishlist$.subscribe(items => this.wishlist = items);
  }

  addToCart(product: SimpleProduct): void {
    this.cartService.addToCart({ id: product.id });
  }

  removeFromWishlist(pid: number): void {
    this.wishlistService.removeFromWishlist(pid);
  }
}
