import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  spaces =[
    {
    name: 'Los más vendidos entre tatuadores',
    description: 'Descubre los productos que los artistas profesionales eligen una y otra vez. Herramientas de alta precisión, tintas confiables y accesorios que garantizan resultados perfectos. Si están en esta lista, es porque ya pasaron la prueba en cientos de sesiones.',
    imageUrl: '/imagenes/Tatuadores/Pack10.png',
    route: '/shopPage',
    query: {filter: 'tattooArtist'}
    },
    {
    name: 'Los más vendidos entre clientes del estudio',
    description: 'Estos son los productos que nuestros clientes aman llevarse a casa. Desde cuidados posteriores hasta accesorios con estilo, están pensados para extender la experiencia del tatuaje más allá del estudio. Porque un buen tattoo también se cuida.',
    imageUrl: '/imagenes/ClientesStudio/home.png',
    route: '/shopPage',
    query: {filter: 'clients'}
    },
    {
      name: 'Nuestra historia',
      description: 'Hop Ink nace del amor por el arte del tatuaje y el deseo de crear una marca auténtica. Empezamos como un pequeño estudio con grandes sueños, y hoy nos impulsa la misma pasión: ofrecer productos que respeten el oficio y acompañen a quienes lo viven día a día.',
      imageUrl: '/imagenes/Artistas/home.png',
      route: '/contact'
    },
    {
    name: 'Nuestros artistas',
    description: 'Cada uno con su estilo, todos con la misma entrega. Aquí conocerás a los tatuadores que dan vida a Hop Ink: sus trayectorias, sus especialidades y una muestra de su trabajo. Arte real, personas reales, tinta con propósito.',
    imageUrl: '/imagenes/Artistas/full.png',
    route: '/artists'
    },
  ]
}
