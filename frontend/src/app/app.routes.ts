import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: '**', redirectTo: '' },
];
