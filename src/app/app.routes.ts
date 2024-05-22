import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'first-step', loadComponent: () => import('./features/first-step/first-step.component').then(m => m.FirstStepComponent) },
  { path: 'second-step', loadComponent: () => import('./features/second-step/second-step.component').then(m => m.SecondStepComponent) },
  { path: 'third-step', loadComponent: () => import('./features/third-step/third-step.component').then(m => m.ThirdStepComponent)},
  { path: '**', redirectTo: 'first-step' }
];
