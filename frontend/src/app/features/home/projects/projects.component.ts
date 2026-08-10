import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { LanguageService } from '../../../core/services/language.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { LocalizedText, Project } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, SectionTitleComponent, RouterLink, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  private readonly dataService = inject(PortfolioDataService);
  private readonly languageService = inject(LanguageService);

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchQuery = '';
  activeFilter = 'all';

  readonly filters = [
    { id: 'all', label: 'PROJECTS.ALL' },
    { id: 'java', label: 'Java' },
    { id: 'angular', label: 'Angular' },
    { id: 'flutter', label: 'Flutter' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'devops', label: 'DevOps' },
  ];

  ngOnInit(): void {
    this.dataService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.applyFilters();
    });
  }

  localized(text: LocalizedText): string {
    return this.languageService.localized(text);
  }

  setFilter(filterId: string): void {
    this.activeFilter = filterId;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredProjects = this.projects.filter((project) => {
      const matchesFilter =
        this.activeFilter === 'all' || project.categories.includes(this.activeFilter);
      const name = this.localized(project.name).toLowerCase();
      const description = this.localized(project.description).toLowerCase();
      const matchesSearch =
        !query ||
        name.includes(query) ||
        description.includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  }
}
