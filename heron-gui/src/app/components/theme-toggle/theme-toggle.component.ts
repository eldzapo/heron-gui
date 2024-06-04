import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ThemeService } from '../../service/theme/theme.service';


@Component({
  selector: 'heron-theme-toggle',
  standalone: true,
  imports: [MatIconModule],
  template: `<button mat-icon-button (click)="toggleTheme()">
  <mat-icon>{{ isDarkMode ? 'wb_sunny' : 'nights_stay' }}</mat-icon>
</button>`,
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
