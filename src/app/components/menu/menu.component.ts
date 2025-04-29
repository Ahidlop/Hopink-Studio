import { Component, Input , Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() isVisible : boolean =false;
  @Output() closeMenu = new EventEmitter<void>();

  close(){
    this.closeMenu.emit();
  }
}
