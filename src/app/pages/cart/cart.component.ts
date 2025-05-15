import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;
      this.total = this.cartService.getTotal();
    });
  }

  removeProduct(id: number): void {
    this.cartService.removeFromCart(id);
  }

  emptyCart(): void {
    this.cartService.emptyCart();
  }
}
