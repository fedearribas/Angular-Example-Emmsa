import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private static readonly SETTINGS_KEY: string = 'theme';

  private get kendouiStylesheetHtmlElement() {
    return this.document.getElementById('app-theme') as HTMLLinkElement;
  }

  private isDarkThemeStoredSetting: boolean = this.getLocalStorageItem(ThemeService.SETTINGS_KEY);
  private isDarkThemeSubject = new BehaviorSubject<boolean>(this.isDarkThemeStoredSetting);
  isDarkTheme$ = this.isDarkThemeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  private setLocalStorageItem(key: string, value: boolean): void {
    const serializedValue: string = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  private getLocalStorageItem(key: string): boolean {
    const serializedValue: string | null = localStorage.getItem(key);
    const result: boolean = (serializedValue) ? JSON.parse(serializedValue) : false;
    return result;
  }

  private setKendoUiControlsMode(stylesheetFilePath: string): void {
    this.kendouiStylesheetHtmlElement.href = stylesheetFilePath;
  }

  private setMode(darkMode: boolean): void {
    if (darkMode) {
      this.setKendoUiControlsMode('dark-theme.css');
    }
    else {
      this.setKendoUiControlsMode('light-theme.css');
    }
    this.isDarkThemeSubject.next(darkMode);
  }

  apply(): void {
    this.setMode(this.isDarkThemeStoredSetting);
  }

  setUserDefinedMode(darkMode: boolean): void {
    this.setMode(darkMode);
    this.isDarkThemeStoredSetting = darkMode;
    this.setLocalStorageItem(ThemeService.SETTINGS_KEY, darkMode);
  }

  setLightMode() {
    this.setUserDefinedMode(false);
  }

  setDarkMode() {
    this.setUserDefinedMode(true);
  }

  toggleTheme() {
    if (this.isDarkThemeStoredSetting)
      this.setLightMode();
    else
      this.setDarkMode();
  }
}