import { Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { AccountComponent } from './pages/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { AccountLinksComponent } from './pages/account-links/account-links.component';
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
  {path: 'wishList', component: WishlistComponent},
  {path: 'paypal', component: PaypalComponent },
  {path: 'accountLinks', component: AccountLinksComponent },
];

export const appRouterProviders = provideRouter(routes);