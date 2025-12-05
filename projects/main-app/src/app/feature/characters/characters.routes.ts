import { Routes } from '@angular/router';
import { CharactersListComponent } from './components/characters-list.component';

export const charactersRoutes: Routes = [
  {
    path: '',
    component: CharactersListComponent,
    data: { title: 'Personnages Star Wars' }
  }
];
