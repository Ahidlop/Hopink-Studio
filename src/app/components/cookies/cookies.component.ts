import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CookiesComponent {
  showBanner = false;
  showPreferences = false;

  preferences = {
    necessary: true,
    analytics: false,
    marketing: false
  };

  ngOnInit(): void {
    const stored = localStorage.getItem('cookie-preferences');
    this.showBanner = !stored;

    if (stored) {
      this.preferences = JSON.parse(stored);
      this.applyPreferences();
    }
  }

  acceptAll() {
    this.preferences.analytics = true;
    this.preferences.marketing = true;
    this.savePreferences();
  }

  rejectAll() {
    this.preferences.analytics = false;
    this.preferences.marketing = false;
    this.savePreferences();
  }

  savePreferences() {
    localStorage.setItem('cookie-preferences', JSON.stringify(this.preferences));
    this.showBanner = false;
    this.applyPreferences();
  }

  togglePreferences() {
    this.showPreferences = !this.showPreferences;
  }

  applyPreferences() {
    // Aquí activas los servicios según consentimiento
    if (this.preferences.analytics) {
      // Aquí iría inicializar Google Analytics, por ejemplo
      console.log('Analytics activado');
    }
    if (this.preferences.marketing) {
      console.log('Marketing activado');
    }
  }
}
