import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersShopComponent } from './customers-shop.component';

describe('CustomersShopComponent', () => {
  let component: CustomersShopComponent;
  let fixture: ComponentFixture<CustomersShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
