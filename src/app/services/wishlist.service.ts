import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface SimpleProduct {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  public items$ = this.wishlistSubject.asObservable();
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

  addToWishlist(pid: number): Observable<{ status: string; items: any[] }> {
    return this.http
      .post<{ status: string; items: any[] }>(
        `${this.API}/wishlist`,
        { product_id: pid },
        this.httpOptions
      )
      .pipe(
        tap(res => this.wishlistSubject.next(res.items))
      );
  }

  removeFromWishlist(pid: number): void {
    this.http.delete<{status:string, items:SimpleProduct[]}>(`${this.API}?product_id=${pid}`,
      this.httpOptions
    ).subscribe(res => this.wishlistSubject.next(res.items));
  }
}
