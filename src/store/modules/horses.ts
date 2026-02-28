import type { Horse } from '@/types'
import { generateHorses } from '@/utils/helpers'

interface HorsesState {
  horses: Map<Horse['id'], Horse>
  errorMessage: string | null
}

export const horsesModule = {
  state: (): HorsesState => ({
    horses: new Map(),
    errorMessage: null,
  }),
  mutations: {
    setHorses(state: HorsesState, horses: Map<Horse['id'], Horse>) {
      state.horses = horses
    },
    setErrorMessage(state: HorsesState, errorMessage: string | null) {
      state.errorMessage = errorMessage
    },
  },
  actions: {
    initHorses({ commit }: { commit: Function }, count: number = 20) {
      if (count < 1 || count > 20) {
        commit('setErrorMessage', 'Count must be between 1 and 20')
        return
      }
      commit('setErrorMessage', null)
      commit('setHorses', generateHorses(count))
    },
  },
  getters: {},
}
