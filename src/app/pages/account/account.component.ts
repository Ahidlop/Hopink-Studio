import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, ApiResponse } from '../../services/auth/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  isLoggedIn = false;
  user: any = {};

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.getUser().subscribe(res => {
      if (res.status==='success' && res.user) {
        this.user = res.user;
        this.isLoggedIn = true;
      }
    });
  }

  login(email: string, password: string) {
    this.auth.login({email, password}).subscribe(res => {
      if (res.status==='success' && res.user) {
        this.user = res.user;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      } else {
        alert(res.message);
      }
    });
  }

  register(name: string, email: string, password: string) {
    this.auth.register({name,email,password}).subscribe(res => {
      alert(res.message);
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.user = {};
      this.router.navigate(['/account']);
    });
  }
}
