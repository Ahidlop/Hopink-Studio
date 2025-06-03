import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies',
  standalone: true,                               
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css'],
  imports: [
    CommonModule,                                   
    FormsModule     
  ]                                 
})
export class CookiesComponent implements OnInit {
  showBanner = false;
  showPreferences = false;
  preferences = { analytics: false, marketing: false };
  private consentCookieName = 'site_consent';

  constructor(private cookieSvc: CookieService) {}

  ngOnInit() {
    this.showBanner = !this.cookieSvc.check(this.consentCookieName);
    if (!this.showBanner) {
      try {
        this.preferences = JSON.parse(this.cookieSvc.get(this.consentCookieName));
      } catch {}
    }
  }

  acceptAll() {
    this.preferences = { analytics: true, marketing: true };
    this.savePreferences();
  }

  rejectAll() {
    this.preferences = { analytics: false, marketing: false };
    this.savePreferences();
  }

  togglePreferences() {
    this.showPreferences = !this.showPreferences;
  }

  savePreferences() {
    this.cookieSvc.set(
      this.consentCookieName,
      JSON.stringify(this.preferences),
      365,
      '/',                // path
      undefined,          // dominio (localhost)
      false,              // secure
      'Lax'               // SameSite
    );
    this.showBanner = false;
    this.showPreferences = false;
    // Aquí inicializarías o detendrías analytics/marketing según prefs
  }
}
