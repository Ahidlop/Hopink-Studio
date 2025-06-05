import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { CartService, CartItem }        from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
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

  /** Vacía el carrito */
  clearCart(): void {
    this.cartService.clearCart();
  }

  /** Al hacer click, abrimos PayPal*/
  onPay(): void {
    const amount = this.total.toFixed(2);
    const url = 
      `https://www.sandbox.paypal.com/cgi-bin/webscr` +
      `?cmd=_xclick` +
      `&business=${encodeURIComponent('sb-fi2ps43035798@business.example.com')}` +
      `&currency_code=EUR` +
      `&amount=${amount}` +
      `&item_name=${encodeURIComponent('Compra en HopInk')}`;
    window.open(url, '_blank');
  }
  more(item: CartItem) {
    this.cartService.addToCart(item);
  }

  decrement(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.decreaseQuantity(item.id);
    } else {
      this.cartService.removeFromCart(item.id);
    }
  }

  decreaseProduct(id: number): void {
    this.cartService.decreaseQuantity(id);
  }

  removeProduct(id: number): void {
    this.cartService.removeFromCart(id);
  }
}
