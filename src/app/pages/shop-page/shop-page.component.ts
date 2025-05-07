import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule , Router} from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit{
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  currentFilter: string ='all';
  mensaje ='';

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) {}

  /*ngOnInit() {
    this.allProducts = this.getAllProducts(); 
    this.route.queryParams.subscribe((params: any) => {
      const filtro = params['filter'] || 'all';
      this.changeFilter(filtro);
      if (!params['filter']) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { filter: 'all' },
          queryParamsHandling: 'merge',
        });
      }
    });
  }
    changeFilter(filter: string): void {
    this.currentFilter=filter;
    this.filteredProducts=filter==='all'
    if (filter === 'all') {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(product => product.category === filter);
    }
  }*/
    ngOnInit() {
      this.allProducts = this.getAllProducts();
      this.route.queryParams.subscribe((params: any) => {
        const filtro = params['filter'] || 'all';
        this.changeFilter(filtro);
      });
    }
    changeFilter(filter: string): void {
      this.currentFilter = filter;
      this.filteredProducts = filter === 'all'
        ? this.allProducts
        : this.allProducts.filter(product => product.category === filter);
    }

  /*Carrito y WishList*/
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

    getAllProducts(): any[] {
      return[
        {
          id:101,
          name: 'Tinta Negra 250ml',
          description: 'Tinta profesional negra intensa para líneas definidas.',
          price: 14.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/TintaNegra.png'
        },
        {
          id:102,
          name: 'Pack 5 Tintas 30ml',
          description: 'Pack de tintas esenciales para trabajos a color. Fórmulas vibrantes y estables.',
          price: 22.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Pack5.png'
        },
        {
          id:103,
          name: 'Pack 10 Tintas 30ml',
          description: 'Colección completa de tonos premium para artistas que trabajan con paletas amplias.',
          price: 39.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Pack10.png'
        },
        {
          id:104,
          name: 'Caja de Agujas Cartucho (20pcs)',
          description: 'Cartuchos estériles de alta precisión compatibles con todas las máquinas estándar.',
          price: 18.5,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Agujas.png'
        },
        {
          id:105,
          name: 'Green Soap 473mL',
          description: 'Limpia la piel durante y después del tatuaje. Fórmula calmante y antibacteriana.',
          price: 9.9,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/GreenSoap.png'
        },
        {
          id:106,
          name: 'Delantal',
          description: 'Delantal negro resistente de HopInk, ideal para uso diario en estudio.',
          price: 12.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Delantal.png'
        },
        {
          id:107,
          name: 'Cartuchos para agujas (20 pcs)',
          description: 'Presentación del cartucho profesional junto a su caja para mostrar calidad y marca.',
          price: 18.5,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Cartuchos.png',
        },
        {
          id:108,
          name: 'Crema para tatuaje',
          description: 'Pomada cicatrizante especial para cuidado post-tatuaje. Regenera y protege la piel.',
          price: 6.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Crema.png'
        },
        {
          id:109,
          name: 'Botella Spray',
          description: 'Spray de limpieza negra mate, recargable, elegante y ergonómico.',
          price: 6.5,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Spray.png'
        },
        {
          id:110,
          name: 'Vaselina 200g',
          description: 'Petrolatum grado médico para lubricar y proteger durante la sesión.',
          price: 4.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Vaselina.png'
        },
        {
          id:111,
          name: 'Gel de transferencia',
          description: 'Gel adhesivo que asegura que el calco permanezca definido en la piel.',
          price: 6.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Transfer.png'
        },
        {
          id:112,
          name: 'Vaso para tinta',
          description: 'Vaso reutilizable con logo, ideal para organizar colores en sesión.',
          price: 0.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Vaso.png'
        },
        {
          id:113,
          name: 'Caja de grips para máquinas',
          description: 'Mangos ergonómicos para sesiones largas. Compatibles con cartuchos.',
          price: 14.5,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Grips.png'
        },
        {
          id:114,
          name: 'Máquina de tatuar rotativa',
          description: 'Máquina rotativa profesional, liviana y potente, con diseño ergonómico.',
          price: 49.99,
          category: 'tattooArtist',
          imageUrl: '/imagenes/Tatuadores/Maquina.png'
        },
        {
          id:1,
          name: 'Crema para tatuaje',
          description: 'Pomada cicatrizante especial para cuidado post-tatuaje. Regenera y protege la piel.',
          price: 6.99,
          category: 'clients',
          imageUrl: '/imagenes/Tatuadores/Crema.png'
        },
        {
          id:2,
          name: 'Aro Dorado Abierto',
          description: 'Un toque de lujo minimalista. Este aro abierto en tono dorado resalta cualquier perforación con elegancia y brillo, perfecto para septum o hélice.',
          price: 3.89,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/aroDorado.png'
        },
        {
          id:3,
          name: 'Aro Grueso Plateado',
          description: 'Diseñado para destacar, este aro curvo de acero grueso ofrece una apariencia atrevida y sólida, ideal para un look poderoso y moderno.',
          price: 3.59,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/aroGrueso.png'
        },
        {
          id:4,
          name: 'Aro Minimalista Acero',
          description: 'Sutil y versátil, este piercing abierto es ideal para quienes buscan discreción sin perder estilo. Perfecto para la oreja, nariz o ceja.',
          price: 2.49,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/aroMinimalista.png'
        },
        {
          id:5,
          name: 'Barbell Acero Clásico',
          description: 'El esencial que nunca falla. Fabricado en acero quirúrgico, este barbell recto es cómodo, resistente y apto para lengua, pezón o industrial.',
          price: 2.99,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/barbell1.png'
        },
        {
          id:6,
          name: 'Barbell Curvo Anatómico',
          description: 'Diseñado para adaptarse mejor a la forma del cuerpo, este barbell curvo es ideal para cejas, rook o labios. Acabado brillante en acero.',
          price: 3.49,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/barbellCurvo.png'
        },
        {
          id:7,
          name: 'Barbell con Disco Plano',
          description: 'Este barbell cuenta con una bola y un disco plano para mayor comodidad al dormir o usar audífonos. Recomendado para lengua y pezón.',
          price: 3.19,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/barbellDisco.png'
        },
        {
          id:8,
          name: 'Barbell Bola XL',
          description: 'Con esferas más grandes para un impacto visual más fuerte, este barbell es perfecto para quienes quieren destacar su perforación con estilo.',
          price: 3.79,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/barbellGrande.png'
        },
        { 
          id:9,
          name: 'Curvo Bola Cónica',
          description: 'Con un diseño ligeramente abierto, este aro curvo es excelente para septum o daith. Fabricado con acero quirúrgico pulido a espejo.',
          price: 3.29,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/curvo1.png'
        },
        {
          id:10,
          name: 'Dúo Barbell Clásico',
          description: 'Pack económico con dos barbells rectos de acero inoxidable. Una excelente opción para quienes tienen múltiples perforaciones.',
          price: 4.99,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/duoBarbell.png'
        },
        {
          id:11,
          name: 'Dúo Curvo Básico',
          description: 'Dos piercings curvos de tamaño estándar, ideales para cejas, rook o labios. Acabado pulido para un look limpio y profesional.',
          price: 4.49,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/duoCurvo.png'
        },
        {
          id:12,
          name: 'Pack Básico Hop Ink (5 piezas)',
          description: 'Todo lo que necesitas para empezar o renovar tu colección. Este pack incluye 5 piercings esenciales en acero quirúrgico: barbells rectos, curvos y aros en distintas formas. Perfecto para quienes buscan calidad, variedad y estilo en un solo set.',
          price: 7.99,
          category: 'clients',
          imageUrl: '/imagenes/ClientesStudio/packBasico.png'
        }
      ];
  }
}
  

