import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    artist: '',
    message: '',
  };

  showBanner = false;            // controla visibilidad del overlay
  bannerData = { name: '', email: '', artist: '', message: '' };

  sendDate(formRef: NgForm): void {
    if (formRef.invalid) {
      formRef.control.markAllAsTouched(); // marca errores
      return;
    }
    // copiar datos ingresados para mostrarlos
    this.bannerData = { ...this.form };
    // vaciar formulario
    formRef.resetForm();
    this.form = { name: '', email: '', artist: '', message: '' };
    // mostrar banner
    this.showBanner = true;
  }

  closeMessage(): void {
    this.showBanner = false; // oculta banner
  }

  getErrorMessage(formRef: NgForm): string {
    const controls = formRef.controls;
    if (controls['name']?.invalid) {
      return 'Falta nombre';
    }
    if (controls['email']?.invalid) {
      return 'Email no válido';
    }
    if (controls['artist']?.invalid) {
      return 'Selecciona artista';
    }
    if (controls['message']?.invalid) {
      return 'Falta mensaje';
    }
    return 'Completa el formulario';
  }
}
