import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';  
import path from 'path';
import { TattooArtitsShopComponent } from './pages/tattoo-artits-shop/tattoo-artits-shop.component';
import { CustomersShopComponent } from './pages/customers-shop/customers-shop.component';
import { AllProductsShopComponent } from './pages/all-products-shop/all-products-shop.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shop', component: AllProductsShopComponent},
    {path: 'customersShop', component: CustomersShopComponent},
    {path: 'tattooArtistsShop', component: TattooArtitsShopComponent},
];
