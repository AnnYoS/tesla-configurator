import { Routes } from '@angular/router';
import {secondStepConfigurationGuard, thirdStepConfigurationGuard} from "./core/guard/tesla.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'first-step', pathMatch: 'full' },
  { path: 'first-step', loadComponent: () => import('./features/first-step/first-step.component').then(m => m.FirstStepComponent) },
  { path: 'second-step', loadComponent: () => import('./features/second-step/second-step.component').then(m => m.SecondStepComponent), canActivate: [secondStepConfigurationGuard] },
  { path: 'third-step', loadComponent: () => import('./features/third-step/third-step.component').then(m => m.ThirdStepComponent), canActivate: [thirdStepConfigurationGuard] },
];
