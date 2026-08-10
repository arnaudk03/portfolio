import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PortfolioDataService } from './portfolio-data.service';
import { ContactRequest, GithubStats, Project } from '../models/portfolio.models';

describe('PortfolioDataService', () => {
  let service: PortfolioDataService;
  let httpMock: HttpTestingController;

  const mockProject: Project = {
    id: 'proj-1',
    name: { fr: 'Projet Test', en: 'Test Project' },
    description: { fr: 'Description FR', en: 'Description EN' },
    architecture: { fr: 'Arch FR', en: 'Arch EN' },
    technologies: ['Java', 'Angular'],
    categories: ['backend'],
    layers: ['api'],
    features: [{ fr: 'Feature FR', en: 'Feature EN' }],
    challenges: [{ fr: 'Défi FR', en: 'Challenge EN' }],
    results: [{ fr: 'Résultat FR', en: 'Result EN' }],
    github: 'https://github.com/user/proj',
  };

  const mockGithubStats: GithubStats = {
    username: 'testuser',
    publicRepos: 10,
    followers: 50,
    following: 20,
    repos: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PortfolioDataService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PortfolioDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes non consommées
  });

  // -------------------------------------------------------------------------
  // getProjects()
  // -------------------------------------------------------------------------

  describe('getProjects()', () => {
    it('devrait retourner la liste des projets depuis /assets/data/projects.json', () => {
      let result: Project[] | undefined;
      service.getProjects().subscribe(p => (result = p));

      const req = httpMock.expectOne('assets/data/projects.json');
      expect(req.request.method).toBe('GET');
      req.flush([mockProject]);

      expect(result).toHaveSize(1);
      expect(result![0].id).toBe('proj-1');
    });
  });

  // -------------------------------------------------------------------------
  // getProject()
  // -------------------------------------------------------------------------

  describe('getProject()', () => {
    it("devrait retourner le projet correspondant à l'id", () => {
      let result: Project | undefined;
      service.getProject('proj-1').subscribe(p => (result = p));

      const req = httpMock.expectOne('assets/data/projects.json');
      req.flush([mockProject]);

      expect(result).toBeDefined();
      expect(result!.id).toBe('proj-1');
    });

    it("devrait retourner undefined si l'id n'existe pas", () => {
      let result: Project | undefined = mockProject;
      service.getProject('id-inexistant').subscribe(p => (result = p));

      const req = httpMock.expectOne('assets/data/projects.json');
      req.flush([mockProject]);

      expect(result).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // sendContact()
  // -------------------------------------------------------------------------

  describe('sendContact()', () => {
    const contactRequest: ContactRequest = {
      name: 'Arnaud',
      email: 'arnaud@example.com',
      subject: 'Test',
      message: 'Message de test',
    };

    it('devrait envoyer un POST à /api/contact', () => {
      service.sendContact(contactRequest).subscribe();

      const req = httpMock.expectOne('http://localhost:8080/api/contact');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(contactRequest);
      req.flush({ message: 'Message sent successfully' });
    });

    it('devrait retourner le message de confirmation', () => {
      let result: { message: string } | undefined;
      service.sendContact(contactRequest).subscribe(r => (result = r));

      const req = httpMock.expectOne('http://localhost:8080/api/contact');
      req.flush({ message: 'Message sent successfully' });

      expect(result?.message).toBe('Message sent successfully');
    });
  });

  // -------------------------------------------------------------------------
  // getGithubStats()
  // -------------------------------------------------------------------------

  describe('getGithubStats()', () => {
    it('devrait appeler le bon endpoint avec le bon username', () => {
      service.getGithubStats().subscribe();

      const req = httpMock.expectOne(
        'http://localhost:8080/api/github/stats?username=arnaudk03'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockGithubStats);
    });

    it('devrait retourner les stats GitHub correctement', () => {
      let result: GithubStats | undefined;
      service.getGithubStats().subscribe(s => (result = s));

      const req = httpMock.expectOne(
        'http://localhost:8080/api/github/stats?username=arnaudk03'
      );
      req.flush(mockGithubStats);

      expect(result?.username).toBe('testuser');
      expect(result?.publicRepos).toBe(10);
    });
  });

  // -------------------------------------------------------------------------
  // getCertifications(), getExperiences(), getPublications()
  // -------------------------------------------------------------------------

  describe('getCertifications()', () => {
    it('devrait appeler /assets/data/certifications.json en GET', () => {
      service.getCertifications().subscribe();
      const req = httpMock.expectOne('assets/data/certifications.json');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('getExperiences()', () => {
    it('devrait appeler /assets/data/experience.json en GET', () => {
      service.getExperiences().subscribe();
      const req = httpMock.expectOne('assets/data/experience.json');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('getPublications()', () => {
    it('devrait appeler /assets/data/publications.json en GET', () => {
      service.getPublications().subscribe();
      const req = httpMock.expectOne('assets/data/publications.json');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });
});
