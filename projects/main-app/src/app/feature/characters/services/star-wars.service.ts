import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Character } from '../models/character.model';

interface SwapiCharacter {
  name: string;
  url: string;
}

interface StarWarsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiCharacter[];
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://swapi.dev/api/people';

  characters = signal<Character[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  getCharacters(page = 1) {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<StarWarsResponse>(`${this.apiUrl}?page=${page}`)
      .subscribe({
        next: (response) => {
          const mappedCharacters = response.results.map(character => ({
            id: this.extractIdFromUrl(character.url),
            name: character.name,
            height: 100,
            mass: 50
          }));
          this.characters.set(mappedCharacters);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Erreur lors du chargement des personnages');
          this.isLoading.set(false);
          console.error('Error fetching characters:', err);
        }
      });
  }

  private extractIdFromUrl(url: string): number {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? parseInt(matches[1], 10) : 0;
  }
}
