import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getAll(): Observable<Product[]> {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost/Hopink-Studio/backend/get_products.php';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
