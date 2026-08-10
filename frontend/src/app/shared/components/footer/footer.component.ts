import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly socialLinks = [
    { icon: 'fa-brands fa-github', url: 'https://github.com', label: 'GitHub' },
    { icon: 'fa-brands fa-linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'fa-solid fa-envelope', url: 'mailto:contact@arnaud-kiema.dev', label: 'Email' },
  ];
}
