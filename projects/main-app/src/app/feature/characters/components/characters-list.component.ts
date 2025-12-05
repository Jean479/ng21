import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarWarsService } from '../services/star-wars.service';
import { CharacterCardComponent } from './character-card.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CharacterCardComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <!-- Grid background pattern -->
      <div class="fixed inset-0 opacity-5">
        <div class="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <!-- Animated gradient overlay -->
      <div class="fixed inset-0 pointer-events-none opacity-30">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10">
        <!-- Header -->
        <header class="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-xs font-mono text-green-400 uppercase tracking-widest">SYSTEM STATUS</span>
              </div>
              <a routerLink="add" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-200 hover:from-cyan-400 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-500/50 border border-cyan-400/50">
                + ADD CHARACTER
              </a>
            </div>
            <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 font-mono uppercase tracking-wider">
              STAR WARS DATABASE
            </h1>
            <p class="text-cyan-300/60 font-mono text-sm mt-2">
              > Accessing SWAPI Network v1.0
            </p>
          </div>
        </header>

        <!-- Main content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          @if (starWarsService.isLoading()) {
            <div class="flex flex-col items-center justify-center py-20 gap-4">
              <div class="flex gap-2">
                <div class="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
              <p class="text-cyan-400 font-mono text-sm">LOADING DATABASE...</p>
            </div>
          } @else if (starWarsService.error()) {
            <div class="border border-red-500/50 bg-red-500/10 rounded-lg p-6 backdrop-blur-sm">
              <div class="flex items-start gap-3">
                <span class="text-2xl">⚠️</span>
                <div>
                  <p class="text-red-400 font-bold mb-3">SYSTEM ERROR</p>
                  <p class="text-red-300/80 font-mono text-sm mb-4">{{ starWarsService.error() }}</p>
                  <button (click)="reload()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm rounded border border-red-500 transition-colors duration-200">
                    RETRY CONNECTION
                  </button>
                </div>
              </div>
            </div>
          } @else if (starWarsService.characters().length === 0) {
            <div class="text-center py-20">
              <p class="text-cyan-400 font-mono text-lg">NO DATA AVAILABLE</p>
            </div>
          } @else {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (character of starWarsService.characters(); track character.id) {
                <app-character-card [character]="character" />
              }
            </div>
          }
        </main>
      </div>
    </div>
  `,
  styles: [`
    @keyframes grid-pulse {
      0%, 100% { opacity: 0.1; }
      50% { opacity: 0.3; }
    }

    .bg-grid-pattern {
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent);
      background-size: 60px 60px;
      animation: grid-pulse 4s ease-in-out infinite;
    }
  `],
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
