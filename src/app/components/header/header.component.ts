import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  toggleMenuClick() {
    this.toggleMenu.emit();
  }
}
