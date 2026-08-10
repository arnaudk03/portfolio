import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  // Helpers de nettoyage
  const resetDom = () => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  };

  beforeEach(() => {
    resetDom();
    // Simuler le comportement par défaut : prefers-color-scheme dark = false
    spyOn(window, 'matchMedia').and.returnValue({ matches: false } as MediaQueryList);

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    resetDom();
  });

  // -------------------------------------------------------------------------
  // Initialisation
  // -------------------------------------------------------------------------

  describe('initialisation', () => {
    it('devrait être créé', () => {
      expect(service).toBeTruthy();
    });

    it('devrait lire le thème depuis localStorage si présent (dark)', () => {
      localStorage.setItem('theme', 'dark');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(ThemeService);
      expect(freshService.isDark()).toBeTrue();
    });

    it('devrait lire le thème depuis localStorage si présent (light)', () => {
      localStorage.setItem('theme', 'light');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(ThemeService);
      expect(freshService.isDark()).toBeFalse();
    });

    it('devrait utiliser prefers-color-scheme si localStorage est vide', () => {
      // matchMedia est déjà espionné pour retourner false dans beforeEach
      expect(service.isDark()).toBeFalse();
    });
  });

  // -------------------------------------------------------------------------
  // setTheme()
  // -------------------------------------------------------------------------

  describe('setTheme()', () => {
    it('setTheme(true) doit mettre isDark à true', () => {
      service.setTheme(true);
      expect(service.isDark()).toBeTrue();
    });

    it('setTheme(false) doit mettre isDark à false', () => {
      service.setTheme(false);
      expect(service.isDark()).toBeFalse();
    });

    it('setTheme(true) doit ajouter la classe "dark" au documentElement', () => {
      service.setTheme(true);
      expect(document.documentElement.classList.contains('dark')).toBeTrue();
    });

    it('setTheme(false) doit retirer la classe "dark" du documentElement', () => {
      document.documentElement.classList.add('dark');
      service.setTheme(false);
      expect(document.documentElement.classList.contains('dark')).toBeFalse();
    });

    it('setTheme(true) doit persister "dark" dans localStorage', () => {
      service.setTheme(true);
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('setTheme(false) doit persister "light" dans localStorage', () => {
      service.setTheme(false);
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });

  // -------------------------------------------------------------------------
  // toggle()
  // -------------------------------------------------------------------------

  describe('toggle()', () => {
    it('doit inverser le thème de false à true', () => {
      service.setTheme(false);
      service.toggle();
      expect(service.isDark()).toBeTrue();
    });

    it('doit inverser le thème de true à false', () => {
      service.setTheme(true);
      service.toggle();
      expect(service.isDark()).toBeFalse();
    });

    it('doit mettre à jour localStorage après toggle', () => {
      service.setTheme(false);
      service.toggle();
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });
});
