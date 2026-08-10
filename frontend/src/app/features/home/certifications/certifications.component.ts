import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { Certification } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-certifications',
  imports: [SectionTitleComponent, TranslatePipe],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent implements OnInit {
  private readonly dataService = inject(PortfolioDataService);

  certifications: Certification[] = [];

  ngOnInit(): void {
    this.dataService.getCertifications().subscribe((data) => {
      this.certifications = data;
    });
  }
}
