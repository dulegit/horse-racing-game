import { type InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { horsesModule } from './modules/horses'
import { raceModule } from './modules/race'
import { resultsModule } from './modules/results'

export interface State {
  horses: ReturnType<typeof horsesModule.state>
  race: ReturnType<typeof raceModule.state>
  results: ReturnType<typeof resultsModule.state>
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  modules: {
    horses: horsesModule,
    race: raceModule,
    results: resultsModule,
  },
})
