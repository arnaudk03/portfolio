import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GithubComponent } from './github.component';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { provideTranslateService } from '@ngx-translate/core';
import { GithubStats } from '../../../core/models/portfolio.models';
import { of, throwError } from 'rxjs';

const mockStats: GithubStats = {
  username: 'arnaudk03',
  publicRepos: 14,
  followers: 80,
  following: 25,
  repos: [
    {
      name: 'portfolio',
      description: 'Mon portfolio personnel',
      htmlUrl: 'https://github.com/arnaudk03/portfolio',
      language: 'TypeScript',
      stars: 10,
      forks: 2,
    },
  ],
};

describe('GithubComponent', () => {
  let component: GithubComponent;
  let fixture: ComponentFixture<GithubComponent>;
  let dataServiceSpy: jasmine.SpyObj<PortfolioDataService>;

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj<PortfolioDataService>('PortfolioDataService', [
      'getGithubStats',
    ]);

    await TestBed.configureTestingModule({
      imports: [GithubComponent],
      providers: [
        { provide: PortfolioDataService, useValue: dataServiceSpy },
        provideTranslateService({ lang: 'fr', fallbackLang: 'fr' }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  // =========================================================================
  // Chargement réussi
  // =========================================================================

  describe('chargement réussi', () => {
    beforeEach(() => {
      dataServiceSpy.getGithubStats.and.returnValue(of(mockStats));
      fixture = TestBed.createComponent(GithubComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('devrait être créé', () => {
      expect(component).toBeTruthy();
    });

    it('stats doit être rempli après ngOnInit', () => {
      expect(component.stats).toEqual(mockStats);
    });

    it('loading doit être false après réception des données', () => {
      expect(component.loading).toBeFalse();
    });

    it('error doit être false si la requête réussit', () => {
      expect(component.error).toBeFalse();
    });

    it('profileUrl doit pointer vers GitHub', () => {
      expect(component.profileUrl).toContain('https://github.com/');
    });

    it('gitlabUrl doit pointer vers GitLab', () => {
      expect(component.gitlabUrl).toContain('https://gitlab.com/');
    });
  });

  // =========================================================================
  // Erreur de chargement
  // =========================================================================

  describe('erreur de chargement', () => {
    beforeEach(() => {
      dataServiceSpy.getGithubStats.and.returnValue(
        throwError(() => new Error('API Error'))
      );
      fixture = TestBed.createComponent(GithubComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('error doit être true si la requête échoue', () => {
      expect(component.error).toBeTrue();
    });

    it("loading doit être false même en cas d'erreur", () => {
      expect(component.loading).toBeFalse();
    });

    it("stats doit rester null en cas d'erreur", () => {
      expect(component.stats).toBeNull();
    });
  });

  // =========================================================================
  // État initial (loading)
  // =========================================================================

  describe('état initial', () => {
    it('loading doit être true avant ngOnInit', () => {
      dataServiceSpy.getGithubStats.and.returnValue(of(mockStats));
      fixture = TestBed.createComponent(GithubComponent);
      component = fixture.componentInstance;
      expect(component.loading).toBeTrue();
    });
  });
});
