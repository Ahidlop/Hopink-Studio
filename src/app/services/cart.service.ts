import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private wishList: Product[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();
  private cart: CartItem[] = [];
  private readonly API = 'http://localhost/Hopink-Studio/backend';
  private cartUrl = `${this.API}/cart.php`;
  private httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) {}

  getCartObservable() {
    return this.cart$;
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  // Carga el carrito desde el backend y desempaqueta el array de items
  loadCart(): void {
    this.http.get<{ success: boolean; items: CartItem[] }>(this.cartUrl, this.httpOptions)
      .pipe(
        map(response => response.items)
      )
      .subscribe(
        items => {
          this.cart = items;
          this.cartSubject.next(this.cart);
        },
        err => {
          console.error('Error cargando carrito', err);
        }
      );
  }

  setCart(items: CartItem[]): void {
    this.cart = items;
    this.cartSubject.next(this.cart);
  }

  // Añadir al carrito
  addToCart(product: { id: number }): void {
    this.http.post<{ success: boolean; items: CartItem[] }>(
      this.cartUrl,
      { product_id: product.id, quantity: 1 },
      this.httpOptions
    )
    .pipe(
      map(response => response.items)
    )
    .subscribe({
      next: items => {
        this.cart = items;
        this.cartSubject.next(this.cart);
      },
      error: err => {
        console.error('Error añadiendo al carrito', err);
        console.log('>>> Respuesta bruta del servidor:', err.error);
      }
    });
  }

  // Disminuir cantidad
  decreaseQuantity(productId: number): void {
    this.http.post<{ success: boolean; items: CartItem[] }>(
      this.cartUrl,
      { product_id: productId, quantity: -1 },
      this.httpOptions
    )
    .pipe(
      map(response => response.items)
    )
    .subscribe(
      items => {
        this.cart = items;
        this.cartSubject.next(this.cart);
      },
      err => {
        console.error('Error disminuyendo cantidad', err);
      }
    );
  }

  // Eliminar del carrito
  removeFromCart(productId: number): void {
    this.http
      .delete<{ success: boolean; items: CartItem[] }>(
        this.cartUrl,               // <-- sin `?product_id=…`
        {
          body: { product_id: productId },
          withCredentials: true
        }
      )
      .pipe(map(res => res.items))
      .subscribe({
        next: items => {
          this.cart = items;
          this.cartSubject.next(this.cart);
        },
        error: err => console.error('Error borrando del carrito', err)
      });
  }

  //Vaciar carrito
  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  // Cálculo de totales
  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Wishlist
  getWishlist(): Product[] {
    return this.wishList;
  }

  addToWishlist(product: Product): void {
    if (!this.wishList.find(p => p.id === product.id)) {
      this.wishList.push(product);
    }
  }

  removeFromWishlist(id: number): void {
    this.wishList = this.wishList.filter(p => p.id !== id);
  }

  // Contador de items
  getItemCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
