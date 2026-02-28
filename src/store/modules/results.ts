import type { RoundResult } from '@/types'

interface ResultsState {
  results: RoundResult[]
}

export const resultsModule = {
  state: (): ResultsState => ({
    results: [],
  }),
  mutations: {
    clearResults(state: ResultsState) {
      state.results = []
    },
  },
  actions: {},
  getters: {},
}
