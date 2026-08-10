import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ArchitectureComponent } from './architecture/architecture.component';
import { ExperienceComponent } from './experience/experience.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { PublicationsComponent } from './publications/publications.component';
import { GithubComponent } from './github/github.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ArchitectureComponent,
    ExperienceComponent,
    CertificationsComponent,
    PublicationsComponent,
    GithubComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
