import { Routes } from '@angular/router';
import { CharactersListComponent } from './components/characters-list.component';
import { CharacterFormComponent } from './components/character-form.component';

export const charactersRoutes: Routes = [
  {
    path: '',
    component: CharactersListComponent,
    data: { title: 'Personnages Star Wars' }
  },
  {
    path: 'add',
    component: CharacterFormComponent,
    data: { title: 'Ajouter un personnage' }
  }
];
