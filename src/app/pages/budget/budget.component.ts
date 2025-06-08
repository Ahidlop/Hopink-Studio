import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget',
  imports: [CommonModule, FormsModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
  form = {
    name: '',
    email: '',
    artist: '',
    service: '',
    height: 0,
    width: 0,
    message: ''
  };

  budget: number | null = null;
  public bannerVisible = false;
  public bannerEmail='';
  
  private readonly API = 'http://localhost/Hopink-Studio/backend/save_budget.php';

  constructor(private http: HttpClient) {}

  getBasePrice(artist: string): number {
  switch (artist.toLowerCase()) {
    case 'alejandra':
    case 'pedro':
      return 80;
    case 'raul':
    case 'fernando':
      return 70;
    case 'aprendiz':
      return 40;
    default:
      return 60;
  }
}

getEstimatedHours(height: number, width: number): number {
  const area = height * width;
  if (area <= 100) return 1;
  if (area <= 300) return 2;
  if (area <= 600) return 3;
  return 4;
}

getTotalPrice(service: string, artist: string, height: number, width: number): number {
  if (service === 'piercing') {
    return artist.toLowerCase() === 'aprendiz' ? 15 : 30;
  }

  const base = this.getBasePrice(artist);
  const hours = this.getEstimatedHours(height, width);
  const colorSupplement = service === 'color' ? 30 : 0;
  return base * hours + colorSupplement;
}
  submitRequest() {
    const isLogged = localStorage.getItem('userLogged') === 'true';

    if (!this.form.name || !this.form.email || !this.form.artist || !this.form.service) {
      alert('Rellena todos los campos obligatorios');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.form.email)) {
      alert('Introduce un email válido');
      return;
    }
      const data = {
        ...this.form,
        budget: this.budget
      };

      if(!isLogged){
        //Si no hay usuario
        this.bannerEmail = this.form.email;
        this.bannerVisible = true;
      }else{
        //Si hay usuario
        this.http.post(this.API, data, { withCredentials: true })
        .subscribe({
          next: () => {
            alert('Presupuesto enviado correctamente');
          },
          error: err => {
            console.error('Error al enviar presupuesto:', err);
            alert('Hubo un error al enviar el presupuesto');
          }
        });
      }
    }
}
