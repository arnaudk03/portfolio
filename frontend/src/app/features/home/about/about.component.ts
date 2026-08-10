import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, SectionTitleComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
