import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  public cart: CartItem[] = [];
  public total = 0;
  public isCheckout: boolean = false;     // controla si se ve el overlay de checkout

  public shippingData = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };

  private cartSub!: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Cargar el carrito desde el backend
    this.cartService.loadCart();

    // Suscribirse a los cambios del carrito:
    this.cartSub = this.cartService.getCartObservable().subscribe(items => {
      this.cart = items;
      this.total = this.cartService.getTotal();
    });
  }

  ngOnDestroy(): void {
    // Desuscribir para evitar memory leaks
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  more(item: CartItem): void {
    this.cartService.addToCart({ id: item.id });
  }

  decrement(item: CartItem): void {
    if(item.quantity<=1){
      this.removeProduct(item);
    }
    else{
      this.cartService.decreaseQuantity(item.id);
    }
    
  }

  removeProduct(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  openCheckout(): void {
    this.isCheckout = true;     // muestra <div class="checkoutBox" *ngIf="isCheckout">
  }

  cancelCheckout(): void {
    this.isCheckout = false;  
  }

  processPayment(): void {
    //Comprueba que todos los datos del envío esten completos
    if (
      !this.shippingData.fullName.trim() ||
      !this.shippingData.address.trim() ||
      !this.shippingData.city.trim() ||
      !this.shippingData.postalCode.trim() ||
      !this.shippingData.country.trim()
    ) {
      alert('Por favor, completa todos los campos de envío.');
      return;
    }

    const businessEmail = encodeURIComponent('sb-fi2ps43035798@business.example.com');  // 
    const itemName = encodeURIComponent('Compra en HopInk');
    const amount = this.total.toFixed(2);          
    const currency = 'EUR';

    const returnUrl = encodeURIComponent('http://localhost:4200/success');
    const cancelUrl = encodeURIComponent('http://localhost:4200/cart');

    const paypalUrl = 
      `https://www.sandbox.paypal.com/cgi-bin/webscr` +
      `?cmd=_xclick` +
      `&business=${businessEmail}` +
      `&item_name=${itemName}` +
      `&amount=${amount}` +
      `&currency_code=${currency}` +
      `&return=${returnUrl}` +
      `&cancel_return=${cancelUrl}`;

    // Redirigir el navegador a PayPal:
  window.open(paypalUrl, '_blank');
  }
}
