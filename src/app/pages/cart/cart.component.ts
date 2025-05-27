// src/app/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart: CartItem[] = [];
  public total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
      this.total = this.cartService.getTotal();
    });
  }

  decreaseProduct(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeProduct(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.total = this.cartService.getTotal();
  }
}
