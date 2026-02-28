import type { RoundProgram } from '@/types'

type RaceStatus = 'idle' | 'ready' | 'running' | 'paused' | 'finished'

type RaceState = {
  program: RoundProgram[]
  currentRoundIndex: number | null
  raceStatus: RaceStatus
  raceProgress: Record<number, number>
}

export const raceModule = {
  state: (): RaceState => ({
    program: [],
    currentRoundIndex: null,
    raceStatus: 'idle',
    raceProgress: {},
  }),
  mutations: {},
  getters: {},
  actions: {},
}
