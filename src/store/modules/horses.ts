import type { Horse } from '@/types'

interface HorsesState {
  horses: Horse[]
}

export const horsesModule = {
  state: (): HorsesState => ({
    horses: [],
  }),
  mutations: {},
  actions: {},
  getters: {},
}
