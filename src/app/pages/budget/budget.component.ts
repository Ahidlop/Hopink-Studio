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
  
  private readonly API = 'http://localhost/Hopink-Studio/backend/save_budget.php';

  constructor(private http: HttpClient) {}

  calculateBudget() {
    if (this.form.service === 'piercing') {
      this.budget = this.form.artist === 'aprendiz' ? 15 : 30;
      return;
    }

    const artistPrices: any = {
      alejandra: 60,
      pedro: 55,
      raul: 70,
      fernando: 65,
      aprendiz: 30
    };

    const basePrice = artistPrices[this.form.artist] || 0;
    const supplement = this.form.service === 'color' ? 10 : 0;
    const hours = this.estimateHours(this.form.height, this.form.width);
    this.budget = hours * (basePrice + supplement);
  }

  estimateHours(height: number, width: number): number {
    const area = height * width;
    if (area < 50) return 1;
    if (area < 150) return 2;
    if (area < 300) return 3;
    return 4;
  }

  submitRequest() {
    if (!this.form.name || !this.form.email || !this.form.artist || !this.form.service) {
      alert('Rellena todos los campos obligatorios');
      return;
    }

    const data = {
      ...this.form,
      budget: this.budget
    };

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
