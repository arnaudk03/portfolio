import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-section-title',
  imports: [TranslatePipe],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
  @Input({ required: true }) titleKey!: string;
  @Input({ required: true }) subtitleKey!: string;
}
