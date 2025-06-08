import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MenuComponent } from './components/menu/menu.component';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CookiesComponent } from './components/cookies/cookies.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent, HeaderComponent, MenuComponent, CookiesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'hopink-studio';
  menuVisible: boolean = false;
  isBrowser: boolean;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    console.log('Menu:', this.menuVisible);
  }

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isBrowser) {
          const fragment = window.location.hash?.substring(1);
          //Si hay fragmento, hace scroll al fragmento
          if(fragment){
            setTimeout(() => {
                const element = document.getElementById(fragment);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }else{
              //Si no hay fragmento, va arriba de la pagina
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'auto' });
            }, 100);
          }
          
        }
      });
  }
}
