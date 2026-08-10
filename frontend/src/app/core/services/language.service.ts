import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizedText } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
  ];

  constructor(private readonly translate: TranslateService) {
    translate.addLangs(['fr', 'en']);
    const saved = localStorage.getItem('lang') ?? 'fr';
    translate.use(saved);
    document.documentElement.lang = saved;
  }

  setLanguage(code: string): void {
    this.translate.use(code);
    localStorage.setItem('lang', code);
    document.documentElement.lang = code;
  }

  currentLang(): string {
    return this.translate.getCurrentLang() ?? 'fr';
  }

  localized(text: LocalizedText): string {
    return text[this.currentLang() as keyof LocalizedText] ?? text.fr;
  }
}
