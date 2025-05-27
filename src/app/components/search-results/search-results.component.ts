import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService, Product } from '../../services/product.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  template: `
    <app-search></app-search>
    <div *ngIf="filteredItems$ | async as items">
      <p *ngIf="items.length === 0">No se encontraron resultados para "{{ query }}"</p>
      <div *ngFor="let item of items">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p>Precio: {{ item.price | currency:'EUR' }}</p>
      </div>
    </div>
  `
})
export class SearchResultsComponent implements OnInit {
  allItems$!: Observable<Product[]>;
  query!: string;
  filteredItems$!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.allItems$ = this.productService.getAll();
    this.route.queryParamMap.pipe(
      map(params => params.get('q') ?? '')
    ).subscribe(q => this.query = q);

    this.filteredItems$ = combineLatest([
      this.allItems$,
      this.route.queryParamMap.pipe(map(params => params.get('q') ?? ''))
    ]).pipe(
      map(([items, q]) =>
        items.filter(item =>
          item.name.toLowerCase().includes(q.toLowerCase()) ||
          item.description.toLowerCase().includes(q.toLowerCase())
        )
      )
    );
  }
}

