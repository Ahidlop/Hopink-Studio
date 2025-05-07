import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any[] = [];

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(items => 
      {this.cart = items}
      );
  }

  get total() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeProduct(id: number) {
    this.cartService.removeFromCart(id);
  }

  emptyCart() {
    this.cartService.clearCart();
  }
}
