import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  { path: 'all', component: App },
  { path: 'active', component: App },
  { path: 'completed', component: App },
  { path: '', redirectTo: '/all', pathMatch: 'full' },
];
