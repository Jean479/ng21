import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent {
  character = input.required<Character>();
}


