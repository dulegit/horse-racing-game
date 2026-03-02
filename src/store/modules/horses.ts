import { HORSES, type Horse } from '@/types'
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
    initHorses({ commit }: { commit: Function }, count: number = HORSES.MAX_GENERATION) {
      if (count < 1 || count > HORSES.MAX_GENERATION) {
        commit('setErrorMessage', `Count must be between 1 and ${HORSES.MAX_GENERATION}`)
        return
      }
      commit('setErrorMessage', null)
      commit('setHorses', generateHorses(count))
    },
  },
  getters: {},
}
