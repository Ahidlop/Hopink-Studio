import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent implements AfterViewInit {
 constructor(private cartService: CartService) {}

  ngAfterViewInit(): void {
    // Obtenemos el total del carrito
    const total = this.cartService.getTotal().toFixed(2);

    paypal.Buttons({
      createOrder: (_data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: { currency_code: 'EUR', value: total }
          }]
        });
      },
      onApprove: (_data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert(`Pago completado. Gracias, ${details.payer.name.given_name}!`);
          // Aquí podrías vaciar el carrito:
          this.cartService.clearCart();
        });
      },
      onError: (err: any) => {
        console.error('Error en PayPal:', err);
        alert('Hubo un error procesando el pago.');
      }
    }).render('#paypal-button-container');
  }
}

