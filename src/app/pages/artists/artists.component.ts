import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artists',
  imports: [CommonModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {
  artists = [
  {
    name: 'Alejandra López',
    description: 'Especialista en realismo suave y tatuajes florales en negro y gris. Su precisión y enfoque emocional transforman cada diseño en una obra artística. Ideal para retratos delicados y piezas íntimas.',
    style: 'Realismo / Black & Grey / Floral',
    price: '60 € / hora',
    image: 'imagenes/Artistas/Alejandra.png'
  },
  {
    name: 'Pedro Peña',
    description: 'Tatuador versátil con estilo neo-tradicional y blackwork. Sus diseños mezclan fuerza visual con trazos sólidos y temáticas simbólicas. Perfecto para quienes buscan tatuajes oscuros y con carácter.',
    style: 'Neo-Tradicional / Blackwork',
    price: '55 € / hora',
    image: 'imagenes/Artistas/Pedro.png'
  },
  {
    name: 'Raúl Suero',
    description: 'Con enfoque ornamental y precisión geométrica, este artista domina los contrastes y las sombras profundas. Su estilo es ideal para piezas grandes, mandalas o tatuajes espirituales.',
    style: 'Black & Grey / Ornamental / Geométrico',
    price: '70 € / hora',
    image: 'imagenes/Artistas/Raul.png'
  },
  {
    name: 'Fernando Peinado',
    description: 'Tatuador de estilo clásico con un enfoque en el old school y el realismo oscuro. Su experiencia se refleja en cada línea precisa y diseño atemporal. Ideal para mangas tradicionales y retratos potentes.',
    style: 'Old School / Realismo Oscuro / Black Ink',
    price: '65 € / hora',
    image: 'imagenes/Artistas/Fernando.png'
  }
]
}
