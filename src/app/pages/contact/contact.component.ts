import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  form = {
    name: '',
    email: '',
    artist: '',
    message: ''
  };

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(fragment);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
        });
      }
    });
  }
  sendDate(): void {
    if (!this.form.name || !this.form.email || !this.form.artist) {
      alert('Por favor, rellena los campos obligatorios');
      return;
    }

    const url = 'http://localhost/Hopink-Studio/backend/save_date.php'; // cambia si usas otro nombre o ruta

    this.http.post(url, this.form, { withCredentials: true }).subscribe({
      next: () => {
        alert('Cita enviada correctamente');
        this.form = { name: '', email: '', artist: '', message: '' }; // limpia
      },
      error: (err) => {
        console.error('Error al enviar cita:', err);
        alert('Error al enviar la cita. Inténtalo más tarde.');
      }
    });
  }
}
