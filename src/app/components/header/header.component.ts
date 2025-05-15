import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public cartService: CartService){}
  
  @Output() toggleMenu = new EventEmitter<void>();

  toggleMenuClick() {
    this.toggleMenu.emit();
  }

}
