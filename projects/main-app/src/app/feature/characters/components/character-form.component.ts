import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Character, characterSchema, createDefaultCharacter } from '../models/character.model';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, FormsModule, Field],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterFormComponent {

  private readonly characterState = signal(createDefaultCharacter());


  protected readonly characterForm = form(this.characterState, characterSchema);

  formData = signal<Partial<Character>>({ name: '', id: 0 });
  successMessage = signal<string | null>(null);
  showPreview = signal(true);

  isFormValid(): boolean {
    const name = this.formData().name;
    return !!(name && typeof name === 'string' && name.trim().length > 0);
  }

  onSubmit() {
    if (!this.isFormValid()) return;

    // Simulate submission (without API call)
    const characterName = this.formData().name;
    this.successMessage.set(`Character "${characterName}" has been added to the database!`);

    // Clear form after 3 seconds
    setTimeout(() => {
      this.onReset();
    }, 3000);
  }

  onReset() {
    this.formData.set({ name: '', id: 0 });
    this.successMessage.set(null);
  }

  updateFormData(field: string, value: any) {
    this.formData.update(current => ({
      ...current,
      [field]: value
    }));
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR');
  }
}

