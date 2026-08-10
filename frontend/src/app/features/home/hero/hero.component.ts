import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { scrollToSection } from '../../../core/utils/scroll.util';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  scrollTo(sectionId: string): void {
    scrollToSection(sectionId);
  }

  downloadCv(): void {
    window.open('/assets/cv/arnaud-kiema-cv.pdf', '_blank');
  }
}
