# Horse Racing Game

A browser-based horse racing simulation built with Vue 3, Vuex 4, and TypeScript. Simulates 6 rounds of racing with real-time animated horse movement — no backend required.

## Tech Stack

- **Vue 3** (Composition API) + **Vuex 4** + **TypeScript**
- **Vite** — build tool & dev server
- **Vitest** — unit testing
- **Playwright** — end-to-end testing

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`

## Getting Started

```sh
npm install
npm run dev
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run `vue-tsc` type checking |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run format` | Format source files with Prettier |

> E2E tests require a running server (`npm run dev` or `npm run preview`).

## Project Structure

```
src/
├── components/
│   ├── horses/       # Horse roster panel
│   ├── race/         # Race track, lanes, animated horses
│   ├── program/      # Race schedule panel
│   ├── results/      # Results panel
│   ├── shared/       # Reusable UI primitives
│   └── AppHeader.vue # App shell & race controls
├── composables/
│   └── useRaceSimulation.ts  # Tick loop & round transitions
├── store/
│   └── modules/      # horses, race, results Vuex modules
├── types/            # Shared TypeScript types
└── utils/            # Pure helper functions
```

## Game Mechanics

- **20 horses** are generated at startup, each with a `condition` rating (1–100)
- **6 rounds** with increasing distances: 1200m → 1400m → … → 2200m
- Each round picks 10 random horses; speed is derived from condition plus a random variance factor
- Rounds transition automatically; the race can be paused and resumed at any time

## Architecture Notes

- Vuex modules are **namespaced** — mutations, actions, and getters are scoped per module
- `useRaceSimulation` lives in `AppHeader.vue` and owns the `setInterval` tick loop (30ms); cleans up via `onUnmounted`
- `App.vue` only dispatches `initHorses` on mount

## IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official / Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Disable Vetur if installed.
