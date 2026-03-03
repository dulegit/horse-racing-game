import type { RaceRound } from '@/types'

interface ResultsState {
  results: RaceRound[]
}

export const resultsModule = {
  state: (): ResultsState => ({
    results: [],
  }),
  mutations: {
    clearResults(state: ResultsState) {
      state.results = []
    },
    addRoundResult(state: ResultsState, roundResult: RaceRound) {
      state.results.push(roundResult)
    },
  },
  actions: {
    saveRoundResult({ commit, state }: { commit: Function; state: ResultsState }, roundResult: RaceRound) {
      if (state.results.map((item) => item.roundId).includes(roundResult.roundId)) {
        console.warn('Round already exist')
        return
      }
      commit('addRoundResult', roundResult)
    },
  },
  getters: {},
}
