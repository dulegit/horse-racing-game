import type { RoundProgram } from '@/types'
import type { State } from '..'
import { getRaceSchedule } from '@/utils/helpers'

const DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

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
  mutations: {
    setProgram(state: RaceState, program: RoundProgram[]) {
      state.program = program
    },
    setCurrentRoundIndex(state: RaceState, index: number | null) {
      state.currentRoundIndex = index
    },
    setRaceStatus(state: RaceState, status: RaceStatus) {
      state.raceStatus = status
    },
    setRaceProgress(state: RaceState, progress: Record<number, number>) {
      state.raceProgress = progress
    },
  },
  getters: {},
  actions: {
    generateProgram({ commit, rootState }: { commit: Function; rootState: State }) {
      const horses = rootState.horses.horses
      const program = getRaceSchedule(horses, DISTANCES)
      commit('setProgram', program)
      commit('setCurrentRoundIndex', 0)
      commit('setRaceStatus', 'ready')
      commit('setRaceProgress', {})
      commit('clearResults')
    },
  },
}
