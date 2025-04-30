import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-customers-shop',
  standalone: true,
  imports: [CommonModule, ShopComponent],
  template: `<app-shop [products]="customerProducts"></app-shop>`,
})
export class CustomersShopComponent {

  customerProducts = [
    {
      name: 'Crema para tatuaje',
      description: 'Pomada cicatrizante especial para cuidado post-tatuaje. Regenera y protege la piel.',
      price: 6.99,
      imageUrl: '/imagenes/Tatuadores/Crema.png'
    },
    {
      name: 'Aro Dorado Abierto',
      description: 'Un toque de lujo minimalista. Este aro abierto en tono dorado resalta cualquier perforación con elegancia y brillo, perfecto para septum o hélice.',
      price: 3.89,
      imageUrl: '/imagenes/ClientesStudio/aroDorado.png'
    },
    {
      name: 'Aro Grueso Plateado',
      description: 'Diseñado para destacar, este aro curvo de acero grueso ofrece una apariencia atrevida y sólida, ideal para un look poderoso y moderno.',
      price: 3.59,
      imageUrl: '/imagenes/ClientesStudio/aroGrueso.png'
    },
    {
      name: 'Aro Minimalista Acero',
      description: 'Sutil y versátil, este piercing abierto es ideal para quienes buscan discreción sin perder estilo. Perfecto para la oreja, nariz o ceja.',
      price: 2.49,
      imageUrl: '/imagenes/ClientesStudio/aroMinimalista.png'
    },
    {
      name: 'Barbell Acero Clásico',
      description: 'El esencial que nunca falla. Fabricado en acero quirúrgico, este barbell recto es cómodo, resistente y apto para lengua, pezón o industrial.',
      price: 2.99,
      imageUrl: '/imagenes/ClientesStudio/barbell1.png'
    },
    {
      name: 'Barbell Curvo Anatómico',
      description: 'Diseñado para adaptarse mejor a la forma del cuerpo, este barbell curvo es ideal para cejas, rook o labios. Acabado brillante en acero.',
      price: 3.49,
      imageUrl: '/imagenes/ClientesStudio/barbellCurvo.png'
    },
    {
      name: 'Barbell con Disco Plano',
      description: 'Este barbell cuenta con una bola y un disco plano para mayor comodidad al dormir o usar audífonos. Recomendado para lengua y pezón.',
      price: 3.19,
      imageUrl: '/imagenes/ClientesStudio/barbellDisco.png'
    },
    {
      name: 'Barbell Bola XL',
      description: 'Con esferas más grandes para un impacto visual más fuerte, este barbell es perfecto para quienes quieren destacar su perforación con estilo.',
      price: 3.79,
      imageUrl: '/imagenes/ClientesStudio/barbellGrande.png'
    },
    {
      name: 'Curvo Bola Cónica',
      description: 'Con un diseño ligeramente abierto, este aro curvo es excelente para septum o daith. Fabricado con acero quirúrgico pulido a espejo.',
      price: 3.29,
      imageUrl: '/imagenes/ClientesStudio/curvo1.png'
    },
    {
      name: 'Dúo Barbell Clásico',
      description: 'Pack económico con dos barbells rectos de acero inoxidable. Una excelente opción para quienes tienen múltiples perforaciones.',
      price: 4.99,
      imageUrl: '/imagenes/ClientesStudio/duoBarbell.png'
    },
    {
      name: 'Dúo Curvo Básico',
      description: 'Dos piercings curvos de tamaño estándar, ideales para cejas, rook o labios. Acabado pulido para un look limpio y profesional.',
      price: 4.49,
      imageUrl: '/imagenes/ClientesStudio/duoCurvo.png'
    },
    {
      name: 'Pack Básico Hop Ink (5 piezas)',
      description: 'Todo lo que necesitas para empezar o renovar tu colección. Este pack incluye 5 piercings esenciales en acero quirúrgico: barbells rectos, curvos y aros en distintas formas. Perfecto para quienes buscan calidad, variedad y estilo en un solo set.',
      price: 7.99,
      imageUrl: '/imagenes/ClientesStudio/packBasico.png'
    }
  ];
}

  
