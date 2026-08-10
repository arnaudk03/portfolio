import { Component, inject, OnInit } from '@angular/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { LanguageService } from '../../../core/services/language.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { ExperienceItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-experience',
  imports: [SectionTitleComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements OnInit {
  private readonly dataService = inject(PortfolioDataService);
  private readonly languageService = inject(LanguageService);

  items: ExperienceItem[] = [];

  ngOnInit(): void {
    this.dataService.getExperiences().subscribe((data) => {
      this.items = data;
    });
  }

  label(text: { fr: string; en: string }): string {
    return this.languageService.localized(text);
  }
}
