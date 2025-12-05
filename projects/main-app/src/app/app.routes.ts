import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters',
    loadChildren: () => import('./feature/characters/characters.routes').then(m => m.charactersRoutes)
  }
];
