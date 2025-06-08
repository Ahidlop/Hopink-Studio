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
  isLoggedIn: boolean = false;
  user: any = null;

  ngOnInit() {
  this.checkLoginStatus();
}

checkLoginStatus() {
  this.http.get<any>('http://localhost/Hopink-Studio/backend/getUser.php', { withCredentials: true })
    .subscribe({
      next: (response) => {
        if (response && response.status === 'success' && response.user && response.user.email) {
          console.log('Usuario loggeado detectado:', response.user);
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          console.log('No hay usuario loggeado');
          this.isLoggedIn = false;
          localStorage.setItem('isLoggedIn', 'false');
          localStorage.removeItem('user');
        }
      },
      error: (err) => {
        console.error('Error al comprobar login:', err);
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('user');
      }
    });
}

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
saveBudget(){
  const user = localStorage.getItem('user');
  const userEmail = user ? JSON.parse(user).email : null;
  
  if (!userEmail) {
      console.error('No se encontró el email del usuario loggeado');
      return;
  }

  const budgetData = {
      email: userEmail,
      artist: this.form.artist,
      service: this.form.service,
      height: this.form.height,
      width: this.form.width,
      message: this.form.message
  };

  this.http.post('http://localhost/Hopink-Studio/backend/save_budget.php', budgetData).subscribe({
      next: (response: any) => {
          console.log('Presupuesto guardado correctamente', response);
          // Limpiar el formulario después:
          this.form = {
              name: '',
              email: '',
              artist: '',
              service: '',
              height: 0,
              width: 0,
              message: ''
          };
      },
      error: (error) => {
          console.error('Error al guardar el presupuesto', error);
      }
  });
}
submitRequest() {
  if (!this.form.name || !this.form.email || !this.form.artist || !this.form.service) {
    alert('Rellena todos los campos obligatorios');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(this.form.email)) {
    alert('Introduce un email válido');
    return;
  }

  console.log('¿Usuario loggeado?', this.isLoggedIn);

  if (!this.isLoggedIn) {
    console.log('Usuario NO loggeado, mostrar banner');
    this.bannerEmail = this.form.email;
    this.bannerVisible = true;
    return; 
  }
  console.log('Usuario loggeado → guardar presupuesto');

  this.bannerVisible = false; // por si estaba abierto antes

  const user = localStorage.getItem('user');
  const email = user ? JSON.parse(user).email : this.form.email;

  const data = {
    ...this.form,
    email: email, // usar email correcto
    budget: this.budget
  };

  console.log('Datos que se envían:', data);

  this.http.post(this.API, data, { withCredentials: true })
    .subscribe({
      next: () => {
        console.log('Presupuesto guardado correctamente');
        alert('Presupuesto enviado correctamente');
        this.form = {
          name: '',
          email: '',
          artist: '',
          service: '',
          height: 0,
          width: 0,
          message: ''
        };
      },
      error: err => {
        console.error('Error al enviar presupuesto:', err);
        alert('Hubo un error al enviar el presupuesto');
      }
    });
}
}

