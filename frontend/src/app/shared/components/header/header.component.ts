import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';
import { scrollToSection } from '../../../core/utils/scroll.util';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);

  readonly isDark = this.themeService.isDark;
  readonly languages = this.languageService.languages;
  readonly navItems = [
    { id: 'home', label: 'NAV.HOME' },
    { id: 'about', label: 'NAV.ABOUT' },
    { id: 'skills', label: 'NAV.SKILLS' },
    { id: 'projects', label: 'NAV.PROJECTS' },
    { id: 'architecture', label: 'NAV.ARCHITECTURE' },
    { id: 'experience', label: 'NAV.EXPERIENCE' },
    { id: 'github', label: 'NAV.GITHUB' },
    { id: 'contact', label: 'NAV.CONTACT' },
  ];

  menuOpen = false;

  navigate(sectionId: string): void {
    this.menuOpen = false;
    scrollToSection(sectionId);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  setLanguage(code: string): void {
    this.languageService.setLanguage(code);
  }

  currentLang(): string {
    return this.languageService.currentLang();
  }

  downloadCv(): void {
    window.open('/assets/cv/arnaud-kiema-cv.pdf', '_blank');
  }
}
