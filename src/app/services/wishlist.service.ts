import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface SimpleProduct {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<SimpleProduct[]>([]);
  public wishlist$: Observable<SimpleProduct[]> = this.wishlistSubject.asObservable();
  private API = 'http://localhost/Hopink-Studio/backend/wishlist.php';
  private httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) {}

  loadWishlist(): void {
    this.http.get<{status:string, items:SimpleProduct[]}>(this.API, this.httpOptions)
      .subscribe({
        next: res => this.wishlistSubject.next(res.items || []),
        error: () => this.wishlistSubject.next([])
      });
  }

  addToWishlist(pid: number): void {
    this.http.post<{status:string, items:SimpleProduct[]}>(this.API,
      { product_id: pid },
      this.httpOptions
    ).subscribe({
      next: res => this.wishlistSubject.next(res.items),
      error: err => {
        if (err.status === 401) alert('Debes iniciar sesión para usar la lista de deseos');
        else console.error(err);
      }
    });
  }

  removeFromWishlist(pid: number): void {
    this.http.delete<{status:string, items:SimpleProduct[]}>(`${this.API}?product_id=${pid}`,
      this.httpOptions
    ).subscribe(res => this.wishlistSubject.next(res.items));
  }
}
