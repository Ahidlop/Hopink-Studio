import { CommonModule } from '@angular/common';
import { ShopComponent } from '../shop/shop.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tattoo-artits-shop',
  standalone: true,
  imports: [CommonModule, ShopComponent],
  template: `<app-shop [products]="tattooProducts"></app-shop>` ,
})
export class TattooArtitsShopComponent {
    tattooProducts = [{
        name: 'Tinta Negra 250ml',
        description: 'Tinta profesional negra intensa para líneas definidas.',
        price: 14.99,
        imageUrl: '/imagenes/Tatuadores/TintaNegra.png'
      },
      {
        name: 'Pack 5 Tintas 30ml',
        description: 'Pack de tintas esenciales para trabajos a color. Fórmulas vibrantes y estables.',
        price: 22.99,
        imageUrl: '/imagenes/Tatuadores/Pack5.png'
      },
      {
        name: 'Pack 10 Tintas 30ml',
        description: 'Colección completa de tonos premium para artistas que trabajan con paletas amplias.',
        price: 39.99,
        imageUrl: '/imagenes/Tatuadores/Pack10.png'
      },
      {
        name: 'Caja de Agujas Cartucho (20pcs)',
        description: 'Cartuchos estériles de alta precisión compatibles con todas las máquinas estándar.',
        price: 18.5,
        imageUrl: '/imagenes/Tatuadores/Agujas.png'
      },
      {
        name: 'Green Soap 473mL',
        description: 'Limpia la piel durante y después del tatuaje. Fórmula calmante y antibacteriana.',
        price: 9.9,
        imageUrl: '/imagenes/Tatuadores/GreenSoap.png'
      },
      {
        name: 'Delantal',
        description: 'Delantal negro resistente de HopInk, ideal para uso diario en estudio.',
        price: 12.99,
        imageUrl: '/imagenes/Tatuadores/Delantal.png'
      },
      {
        name: 'Cartuchos para agujas (20 pcs)',
        description: 'Presentación del cartucho profesional junto a su caja para mostrar calidad y marca.',
        price: 18.5,
        imageUrl: '/imagenes/Tatuadores/Cartuchos.png',
      },
      {
        name: 'Crema para tatuaje',
        description: 'Pomada cicatrizante especial para cuidado post-tatuaje. Regenera y protege la piel.',
        price: 6.99,
        imageUrl: '/imagenes/Tatuadores/Crema.png'
      },
      {
        name: 'Botella Spray',
        description: 'Spray de limpieza negra mate, recargable, elegante y ergonómico.',
        price: 6.5,
        imageUrl: '/imagenes/Tatuadores/Spray.png'
      },
      {
        name: 'Vaselina 200g',
        description: 'Petrolatum grado médico para lubricar y proteger durante la sesión.',
        price: 4.99,
        imageUrl: '/imagenes/Tatuadores/Vaselina.png'
      },
      {
        name: 'Gel de transferencia',
        description: 'Gel adhesivo que asegura que el calco permanezca definido en la piel.',
        price: 6.99,
        imageUrl: '/imagenes/Tatuadores/Transfer.png'
      },
      {
        name: 'Vaso para tinta',
        description: 'Vaso reutilizable con logo, ideal para organizar colores en sesión.',
        price: 0.99,
        imageUrl: '/imagenes/Tatuadores/Vaso.png'
      },
      {
        name: 'Caja de grips para máquinas',
        description: 'Mangos ergonómicos para sesiones largas. Compatibles con cartuchos.',
        price: 14.5,
        imageUrl: '/imagenes/Tatuadores/Grips.png'
      },
      {
        name: 'Máquina de tatuar rotativa',
        description: 'Máquina rotativa profesional, liviana y potente, con diseño ergonómico.',
        price: 49.99,
        imageUrl: '/imagenes/Tatuadores/Maquina.png'
      },
    ];
  }
  

