import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { LocalizedText, Project } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-project-detail',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(PortfolioDataService);
  private readonly languageService = inject(LanguageService);

  project: Project | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getProject(id).subscribe((project) => {
        this.project = project;
      });
    }
  }

  localized(text: LocalizedText): string {
    return this.languageService.localized(text);
  }
}
