import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsShopComponent } from './all-products-shop.component';

describe('AllProductsShopComponent', () => {
  let component: AllProductsShopComponent;
  let fixture: ComponentFixture<AllProductsShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductsShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
