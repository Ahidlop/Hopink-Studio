import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private wishList: Product[] =[];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    const item = this.cart.find(p => p.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
  }

  decreaseQuantity(id: number): void {
  const index = this.cart.findIndex(item => item.id === id);
  if (index !== -1) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
    } else {
      this.cart.splice(index, 1);
    }
    this.cartSubject.next([...this.cart]);
  }
}

  removeFromCart(id: number): void {
    this.cart = this.cart.filter(p => p.id !== id);
    this.cartSubject.next([...this.cart]);
  }

  emptyCart(): void {
    this.cart = [];
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getWishlist(): Product[] {
  return this.wishList;
  }

  addToWishlist(product: Product): void {
    const exists = this.wishList.find(p => p.id === product.id);
    if (!exists) {
      this.wishList.push(product);
    }
  }

  removeFromWishlist(id: number): void {
    this.wishList = this.wishList.filter(p => p.id !== id);
  }

  getItemCount(): number{
    return this.cart.reduce((sum,item) => sum + item.quantity, 0)
  }

}
