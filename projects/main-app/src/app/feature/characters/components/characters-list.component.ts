import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarWarsService } from '../services/star-wars.service';
import { CharacterCardComponent } from './character-card.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CharacterCardComponent],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersListComponent implements OnInit {
  protected readonly starWarsService = inject(StarWarsService);

  ngOnInit() {
    this.starWarsService.getCharacters();
  }

  reload() {
    this.starWarsService.getCharacters();
  }
}
