import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  @Input() products: any[] = [];
  mensaje = '';

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.mostrarMensaje('✅ Producto añadido al carrito');
    console.log('Producto añadido:', product);
  }

  addToWishlist(product: any) {
    this.cartService.addToWishlist(product);
    this.mostrarMensaje('❤️ Añadido a la lista de deseos');
    console.log('Añadido a lista de deseos:', product);
  }

  mostrarMensaje(texto: string) {
    this.mensaje = texto;
    setTimeout(() => {
      this.mensaje = '';
    }, 2000);
  }
}
