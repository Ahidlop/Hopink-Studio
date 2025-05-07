import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  isLoggedIn = false;

  user = {
    name: 'Alejandra Lopez',
    email: 'ahidlop00@gmail.com'
  };

  login(email: string, password: string) {
    if (email && password) {
      this.isLoggedIn = true;
    }
  }

  register(name: string, email: string, password: string) {
    if (name && email && password) {
      this.isLoggedIn = true;
      this.user = { name, email };
    }
  }

  logout() {
    this.isLoggedIn = false;
  }
}