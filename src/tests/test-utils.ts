import { key } from '@/store'
import { horsesModule } from '@/store/modules/horses'
import { raceModule } from '@/store/modules/race'
import { resultsModule } from '@/store/modules/results'
import { render } from '@testing-library/vue'
import type { Component } from 'vue'
import { createStore } from 'vuex'

const customRender = (component: Component, options = {}) => {
  const store = createStore({
    modules: {
      horses: { namespaced: true, ...horsesModule },
      race: { namespaced: true, ...raceModule },
      results: { namespaced: true, ...resultsModule },
    },
  })

  const defaultOptions = {
    global: {
      plugins: [store],
      provide: { [key]: store },
    },
    ...options,
  }

  const renderResult = render(component, defaultOptions)

  return { ...renderResult, store }
}

export { customRender as render }
