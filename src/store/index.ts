import { type InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { horsesModule } from './modules/horses'
import { raceModule } from './modules/race'
import { resultsModule } from './modules/results'

export type State = {
  horses: ReturnType<typeof horsesModule.state>
  race: ReturnType<typeof raceModule.state>
  results: ReturnType<typeof resultsModule.state>
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  modules: {
    horses: { namespaced: true, ...horsesModule },
    race: { namespaced: true, ...raceModule },
    results: { namespaced: true, ...resultsModule },
  },
})
