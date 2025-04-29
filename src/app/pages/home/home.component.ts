import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  products = [
    {
      name: 'Tinta Negra 250ml',
      description: 'Tinta profesional negra intensa para líneas definidas.',
      price: 19.99,
      imageUrl: 'assets/images/tinta-negra.jpg'
    },
    {
      name: 'Green Soap 473ml',
      description: 'Limpia y calma la piel durante el proceso de tatuado.',
      price: 12.5,
      imageUrl: 'assets/images/green-soap.jpg'
    }
    // más productos...
  ];

  addToCart(product: any) {
    console.log('Añadido al carrito:', product);
    // lógica real aquí
  }

  addToWishlist(product: any) {
    console.log('Añadido a favoritos:', product);
    // lógica real aquí
  }
}
