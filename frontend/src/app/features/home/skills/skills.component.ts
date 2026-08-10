import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { LanguageService } from '../../../core/services/language.service';
import { SkillCategory } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-skills',
  imports: [SectionTitleComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);

  categories: SkillCategory[] = [];

  ngOnInit(): void {
    this.http.get<SkillCategory[]>('/assets/data/skills.json').subscribe((data) => {
      this.categories = data;
    });
  }

  label(text: { fr: string; en: string }): string {
    return this.languageService.localized(text);
  }
}
