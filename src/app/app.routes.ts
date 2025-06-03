import { Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { AccountComponent } from './pages/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { LegalComponent } from './components/legal/legal.component';
import path from 'path';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'account', component: AccountComponent },
  {path: 'cart', component: CartComponent },
  {path: 'shopPage', component: ShopPageComponent },
  {path: 'cookies' , component: CookiesComponent},
  {path: 'paypal', component: PaypalComponent },
  {path: 'legal', component: LegalComponent },
];

export const appRouterProviders = provideRouter(routes);