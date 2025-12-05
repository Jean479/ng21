import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <!-- Animated gradient overlay -->
      <div class="fixed inset-0 pointer-events-none opacity-30">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10">
        <!-- Header -->
        <header class="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">CREATE NEW RECORD</span>
            </div>
            <h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 font-mono uppercase tracking-wider">
              ADD CHARACTER
            </h1>
            <p class="text-cyan-300/60 font-mono text-sm mt-2">
              > Initializing character creation protocol
            </p>
          </div>
        </header>

        <!-- Main content -->
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <!-- Form Card -->
          <form (ngSubmit)="onSubmit()" class="group relative overflow-hidden rounded-lg border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-lg">
            <!-- Glowing background effect -->
            <div class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
            </div>

            <!-- Content -->
            <div class="relative z-10 space-y-6">
              <!-- Name Field -->
              <div>
                <label for="name" class="block text-sm font-mono text-cyan-400 uppercase tracking-widest mb-2">
                  > Character Name
                </label>
                <input
                  id="name"
                  [ngModel]="formData().name"
                  (ngModelChange)="updateFormData('name', $event)"
                  name="name"
                  type="text"
                  placeholder="e.g., Luke Skywalker"
                  class="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 hover:border-cyan-400/50"
                />
                <p class="text-xs text-cyan-300/60 font-mono mt-1">Enter the character's full name</p>
              </div>

              <!-- ID Field (optional, could be auto-generated) -->
              <div>
                <label for="id" class="block text-sm font-mono text-cyan-400 uppercase tracking-widest mb-2">
                  > Character ID (Optional)
                </label>
                <input
                  id="id"
                  [ngModel]="formData().id"
                  (ngModelChange)="updateFormData('id', $event)"
                  name="id"
                  type="number"
                  placeholder="e.g., 1"
                  class="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 hover:border-cyan-400/50"
                />
                <p class="text-xs text-cyan-300/60 font-mono mt-1">Leave empty for auto-generation</p>
              </div>

              <!-- Status Info -->
              <div class="border-t border-cyan-500/20 pt-6">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-400 font-mono">STATUS</span>
                    <span class="inline-flex items-center gap-2">
                      <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span class="font-mono text-green-400 text-xs uppercase tracking-widest">READY</span>
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-400 font-mono">VALIDATION</span>
                    <span class="font-mono text-amber-400 text-xs uppercase tracking-widest" [ngClass]="{'text-green-400': isFormValid()}">
                      {{ isFormValid() ? 'PASSED' : 'PENDING' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 pt-4">
                <button
                  type="submit"
                  [disabled]="!isFormValid()"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono font-bold uppercase tracking-widest rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:from-cyan-400 hover:enabled:to-blue-400 hover:enabled:shadow-lg hover:enabled:shadow-cyan-500/50"
                >
                  > SUBMIT CHARACTER
                </button>
                <button
                  type="button"
                  (click)="onReset()"
                  class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-mono font-bold uppercase tracking-widest rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
                >
                  RESET
                </button>
              </div>
            </div>

            <!-- Corner accents -->
            <div class="absolute top-0 right-0 h-1 w-1/3 bg-gradient-to-r from-cyan-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div class="absolute bottom-0 left-0 h-1 w-1/3 bg-gradient-to-r from-transparent to-cyan-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </form>

          <!-- Preview Section -->
          @if (showPreview()) {
            <div class="mt-12">
              <h2 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono uppercase tracking-wider mb-6">
                > PREVIEW
              </h2>
              
              <div class="group relative overflow-hidden rounded-lg border border-green-500/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-lg">
                <div class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
                </div>

                <div class="relative z-10">
                  <div class="mb-2 flex items-center gap-2">
                    <span class="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span class="text-xs font-mono text-green-400 uppercase tracking-widest">ID: {{ formData().id || 'AUTO' }}</span>
                  </div>
                  
                  <h3 class="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-green-300">
                    {{ formData().name || '[NO NAME]' }}
                  </h3>

                  <div class="mt-4 space-y-2 border-t border-green-500/20 pt-4">
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-400">STATUS</span>
                      <span class="font-mono text-green-400">NEW_RECORD</span>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-400">CREATED</span>
                      <span class="font-mono text-green-400">{{ getCurrentDate() }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Success Message -->
          @if (successMessage()) {
            <div class="mt-6 border border-green-500/50 bg-green-500/10 rounded-lg p-4 backdrop-blur-sm">
              <div class="flex items-start gap-3">
                <span class="text-xl">✓</span>
                <div>
                  <p class="text-green-400 font-bold font-mono uppercase">SUCCESS</p>
                  <p class="text-green-300/80 font-mono text-sm">{{ successMessage() }}</p>
                </div>
              </div>
            </div>
          }
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterFormComponent {
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
