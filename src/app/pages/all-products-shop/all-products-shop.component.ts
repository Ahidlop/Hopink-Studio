import { CommonModule } from "@angular/common";
import { ShopComponent } from "../shop/shop.component";
import { Component } from "@angular/core";

@Component({
  selector: 'app-all-products-shop',
  standalone: true,
  imports: [CommonModule, ShopComponent],
  template: `<app-shop [products]="allProducts"></app-shop>`
})
export class AllProductsShopComponent {
  allProducts = [
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
    },
    {
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
