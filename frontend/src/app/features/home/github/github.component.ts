import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { GithubStats } from '../../../core/models/portfolio.models';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-github',
  imports: [TranslatePipe, SectionTitleComponent],
  templateUrl: './github.component.html',
  styleUrl: './github.component.scss',
})
export class GithubComponent implements OnInit {
  private readonly dataService = inject(PortfolioDataService);

  stats: GithubStats | null = null;
  loading = true;
  error = false;
  readonly profileUrl = `https://github.com/${environment.githubUsername}`;
  readonly gitlabUrl = `https://gitlab.com/${environment.gitlabUsername}`;

  ngOnInit(): void {
    this.dataService.getGithubStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
