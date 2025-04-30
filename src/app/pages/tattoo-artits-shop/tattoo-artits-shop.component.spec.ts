import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TattooArtitsShopComponent } from './tattoo-artits-shop.component';

describe('TattooArtitsShopComponent', () => {
  let component: TattooArtitsShopComponent;
  let fixture: ComponentFixture<TattooArtitsShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TattooArtitsShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TattooArtitsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
