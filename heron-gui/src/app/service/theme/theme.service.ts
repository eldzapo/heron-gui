import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  protected darkMode = false;

  public isDarkMode() {
    return this.darkMode;
  }

  public setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
    if (isDarkMode) {
      this.addClassToAllElements('dark-theme');
    } else {
      this.removeClassFromAllElements('dark-theme');
    }
  }

  private addClassToAllElements(className: string) {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(element => {
      element.classList.add(className);
    });
  }

  private removeClassFromAllElements(className: string) {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(element => {
      element.classList.remove(className);
    });
  }
}
