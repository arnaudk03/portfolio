import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ContactRequest, Certification, ExperienceItem, GithubStats, Project, Publication } from '../models/portfolio.models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/assets/data/projects.json');
  }

  getProject(id: string): Observable<Project | undefined> {
    return this.getProjects().pipe(map((projects) => projects.find((p) => p.id === id)));
  }

  sendContact(request: ContactRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/contact`, request);
  }

  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>('/assets/data/certifications.json');
  }

  getExperiences(): Observable<ExperienceItem[]> {
    return this.http.get<ExperienceItem[]>('/assets/data/experience.json');
  }

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>('/assets/data/publications.json');
  }

  getGithubStats(): Observable<GithubStats> {
    return this.http.get<GithubStats>(
      `${environment.apiUrl}/github/stats?username=${environment.githubUsername}`,
    );
  }
}
