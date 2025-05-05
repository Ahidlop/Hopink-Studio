import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd} from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MenuComponent } from './components/menu/menu.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule , FooterComponent, HeaderComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hopink-studio';
  menuVisible: boolean =false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    console.log('Menu:' ,this.menuVisible);
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Espera un poco para que la vista se renderice y luego sube
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'auto' }); // "auto" = más fiable que "smooth"
        }, 100); // 100ms para asegurar render de componente
      });
  }
}
  
