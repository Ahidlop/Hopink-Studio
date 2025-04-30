import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  @Input() products: any[] = [];
  
  addToCart(product: any) {
    console.log('Añadido al carrito:', product);
  }

  addToWishlist(product: any) {
    console.log('Añadido a favoritos:', product);
  }
}
