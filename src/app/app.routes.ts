import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';  
import path from 'path';
import { TattooArtitsShopComponent } from './pages/tattoo-artits-shop/tattoo-artits-shop.component';
import { CustomersShopComponent } from './pages/customers-shop/customers-shop.component';
import { AllProductsShopComponent } from './pages/all-products-shop/all-products-shop.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shop', component: AllProductsShopComponent},
    {path: 'customersShop', component: CustomersShopComponent},
    {path: 'tattooArtistsShop', component: TattooArtitsShopComponent},
    {path: 'artists', component: ArtistsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'budget', component: BudgetComponent},
    {path: 'account', component: AccountComponent},
];
