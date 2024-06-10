import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ThemeService } from '../../service/theme/theme.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'heron-theme-toggle',
  standalone: true,
  imports: [MatIconModule, MatSlideToggleModule],
  template: `<mat-slide-toggle  (click)="toggleTheme()">
          </mat-slide-toggle>`,
})
export class ThemeToggleComponent {
 protected isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  protected toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
