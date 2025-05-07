import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cart$ = this.cartItems.asObservable();

  private wishlistItems = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistItems.asObservable();

  addToCart(product: any) {
    const items = this.cartItems.value;
    const index = items.findIndex(p => p.id === product.id);

    if (index > -1) {
      items[index].quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    this.cartItems.next([...items]);
  }

  addToWishlist(product: any) {
    const items = this.wishlistItems.value;
    if (!items.some(p => p.id === product.id)) {
      this.wishlistItems.next([...items, product]);
    }
  }

  removeFromCart(id: number) {
    const updated = this.cartItems.value.filter(p => p.id !== id);
    this.cartItems.next(updated);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getTotal() {
    return this.cartItems.value.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }
}
