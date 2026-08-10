import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { LocalizedText } from '../models/portfolio.models';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    localStorage.removeItem('lang');
    document.documentElement.lang = '';

    translateSpy = jasmine.createSpyObj<TranslateService>('TranslateService', [
      'addLangs',
      'use',
      'getCurrentLang',
    ]);
    translateSpy.use.and.returnValue({} as any);
    translateSpy.getCurrentLang.and.returnValue('fr');

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: translateSpy },
      ],
    });

    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    localStorage.removeItem('lang');
  });

  // -------------------------------------------------------------------------
  // Initialisation
  // -------------------------------------------------------------------------

  describe('initialisation', () => {
    it('devrait être créé', () => {
      expect(service).toBeTruthy();
    });

    it('devrait appeler addLangs avec [fr, en]', () => {
      expect(translateSpy.addLangs).toHaveBeenCalledWith(['fr', 'en']);
    });

    it('devrait utiliser "fr" comme langue par défaut quand localStorage est vide', () => {
      expect(translateSpy.use).toHaveBeenCalledWith('fr');
    });

    it('devrait utiliser la langue stockée dans localStorage', () => {
      localStorage.setItem('lang', 'en');
      TestBed.resetTestingModule();
      const freshTranslateSpy = jasmine.createSpyObj<TranslateService>('TranslateService', [
        'addLangs', 'use', 'getCurrentLang',
      ]);
      freshTranslateSpy.use.and.returnValue({} as any);
      freshTranslateSpy.getCurrentLang.and.returnValue('en');

      TestBed.configureTestingModule({
        providers: [
          LanguageService,
          { provide: TranslateService, useValue: freshTranslateSpy },
        ],
      });
      TestBed.inject(LanguageService);

      expect(freshTranslateSpy.use).toHaveBeenCalledWith('en');
    });

    it('devrait positionner document.documentElement.lang a la langue initiale', () => {
      // fr est la valeur par défaut dans beforeEach
      expect(document.documentElement.lang).toBe('fr');
    });
  });

  // -------------------------------------------------------------------------
  // languages[]
  // -------------------------------------------------------------------------

  describe('languages', () => {
    it('devrait exposer [fr, en] avec les bons codes', () => {
      expect(service.languages.map(l => l.code)).toEqual(['fr', 'en']);
    });

    it('devrait exposer les labels FR et EN', () => {
      expect(service.languages.map(l => l.label)).toEqual(['FR', 'EN']);
    });
  });

  // -------------------------------------------------------------------------
  // setLanguage()
  // -------------------------------------------------------------------------

  describe('setLanguage()', () => {
    it('devrait appeler translate.use() avec le code fourni', () => {
      service.setLanguage('en');
      expect(translateSpy.use).toHaveBeenCalledWith('en');
    });

    it('devrait persister la langue dans localStorage', () => {
      service.setLanguage('en');
      expect(localStorage.getItem('lang')).toBe('en');
    });

    it('devrait mettre à jour document.documentElement.lang', () => {
      service.setLanguage('en');
      expect(document.documentElement.lang).toBe('en');
    });
  });

  // -------------------------------------------------------------------------
  // currentLang()
  // -------------------------------------------------------------------------

  describe('currentLang()', () => {
    it('devrait retourner la langue courante du service de traduction', () => {
      translateSpy.getCurrentLang.and.returnValue('fr');
      expect(service.currentLang()).toBe('fr');
    });

    it('devrait retourner "fr" si getCurrentLang retourne undefined', () => {
      translateSpy.getCurrentLang.and.returnValue(undefined as any);
      expect(service.currentLang()).toBe('fr');
    });
  });

  // -------------------------------------------------------------------------
  // localized()
  // -------------------------------------------------------------------------

  describe('localized()', () => {
    const text: LocalizedText = { fr: 'Bonjour', en: 'Hello' };

    it('doit retourner le texte français si la langue courante est "fr"', () => {
      translateSpy.getCurrentLang.and.returnValue('fr');
      expect(service.localized(text)).toBe('Bonjour');
    });

    it('doit retourner le texte anglais si la langue courante est "en"', () => {
      translateSpy.getCurrentLang.and.returnValue('en');
      expect(service.localized(text)).toBe('Hello');
    });

    it('doit retourner le FR par défaut si la langue est inconnue', () => {
      translateSpy.getCurrentLang.and.returnValue('de');
      // 'de' n'est pas une clé de LocalizedText, fallback sur .fr
      expect(service.localized(text)).toBe('Bonjour');
    });
  });
});
