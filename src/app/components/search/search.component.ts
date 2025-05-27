import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="searchDiv">
      <input type="text" formControlName="q" class="searchbox" placeholder="Buscar...">
      <button type="submit" class="searchbutton">
        <img src="" alt="Buscar" class="lupa">
      </button>
    </form>
  `
})
export class SearchComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({ q: [''] });
  }

  onSubmit(): void {
    const query = this.form.value.q?.trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    } else {
      this.router.navigate(['/']);
    }
  }
}

