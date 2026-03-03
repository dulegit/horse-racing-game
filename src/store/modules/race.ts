import type { LaneItem, RaceRound } from '@/types'
import type { State } from '..'
import { createLaneItems, getRaceSchedule } from '@/utils/helpers'
import store from '..'

export const DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

type RaceStatus = 'idle' | 'ready' | 'running' | 'paused' | 'finished'

type RaceState = {
  program: RaceRound[]
  currentRoundIndex: number | null
  currentRoundPlacement: number[]
  raceStatus: RaceStatus
  raceProgress: Map<number, LaneItem>
}

export const raceModule = {
  state: (): RaceState => ({
    program: [],
    currentRoundIndex: null,
    currentRoundPlacement: [],
    raceStatus: 'idle',
    raceProgress: new Map(),
  }),
  mutations: {
    setProgram(state: RaceState, program: RaceRound[]) {
      state.program = program
    },
    setCurrentRoundIndex(state: RaceState, index: number | null) {
      state.currentRoundIndex = index
    },
    setRaceStatus(state: RaceState, status: RaceStatus) {
      state.raceStatus = status
    },
    setInitRaceProgress(state: RaceState, laneItem: LaneItem[]) {
      if (!laneItem.length) {
        console.warn('No lane items provided to setInitRaceProgress')
        Array.from(state.raceProgress.values()).forEach((element) => {
          element.progress = 0
        })
        return
      }
      laneItem.forEach((item) => {
        state.raceProgress.set(item.horse.id, item)
      })
    },
    setRaceProgress(state: RaceState, progressObj: { horseId: number; progress: number }) {
      const { horseId, progress } = progressObj
      const horseToProgress = state.raceProgress.get(horseId)
      if (!horseToProgress) return
      if (Math.ceil((horseToProgress.progress += progress)) >= 100) {
        horseToProgress.progress = 100
        store.commit('setCurrentRoundPlacement', horseId)
        return
      }
      horseToProgress.progress = horseToProgress.progress + progress
    },
    clearRaceProgress(state: RaceState) {
      state.raceProgress.clear()
    },
    setCurrentRoundPlacement(state: RaceState, laneId: number) {
      if (state.currentRoundPlacement.includes(laneId)) {
        console.warn(`Horse with lane ID ${laneId} is already in the current round placement.`)
        return
      }
      state.currentRoundPlacement.push(laneId)
    },
    clearCurrentPlacement(state: RaceState) {
      state.currentRoundPlacement = []
    },
  },
  getters: {
    hasProgram(state: RaceState): boolean {
      return state.program.length > 0
    },
    currentRoundProgram(state: RaceState): RaceRound | null {
      if (state.currentRoundIndex === null) return null
      return state.program[state.currentRoundIndex] || null
    },
  },
  actions: {
    generateProgram({ commit, rootState }: { commit: Function; rootState: State }) {
      const horses = rootState.horses.horses
      const program = getRaceSchedule(horses, DISTANCES)

      if (!program[0]) {
        commit('setRaceStatus', 'idle')
        return
      }
      const laneItems = createLaneItems(program[0].horseIds, horses)

      commit('clearResults')
      commit('clearRaceProgress')
      commit('setProgram', program)
      commit('setCurrentRoundIndex', 0)
      commit('setRaceStatus', 'ready')
      commit('setInitRaceProgress', laneItems)
    },
    startNewRound({ commit, state, rootState }: { commit: Function; state: RaceState; rootState: State }) {
      const horses = rootState.horses.horses
      if (!state.currentRoundIndex) {
        commit('setRaceStatus', 'idle')
        return
      }
      const curr = state.program[state.currentRoundIndex]
      if (!curr) {
        commit('setRaceStatus', 'idle')
        return
      }
      const laneItems = createLaneItems(curr.horseIds, horses)
      commit('clearRaceProgress')
      commit('setRaceStatus', 'ready')
      commit('setInitRaceProgress', laneItems)
    },
    updateCurrentRoundIndex({ commit, state }: { commit: Function; state: RaceState }, index: number) {
      if (index < 0 || index >= state.program.length) {
        console.warn(`Invalid round index: ${index}`)
        return
      }
      commit('setCurrentRoundIndex', index)
    },
    startRace({ commit, state }: { commit: Function; state: RaceState }) {
      if (state.raceStatus === 'ready' || state.raceStatus === 'paused') {
        commit('setRaceStatus', 'running')
      }
    },
    updateRaceStatus({ commit }: { commit: Function }, status: RaceStatus) {
      commit('setRaceStatus', status)
    },
    pauseRace({ commit, state }: { commit: Function; state: RaceState }) {
      if (state.raceStatus === 'running') {
        commit('setRaceStatus', 'paused')
      }
    },
    updateRaceProgress({ commit }: { commit: Function }, progressObj: { horseId: number; progress: number }) {
      commit('setRaceProgress', progressObj)
    },
    resetCurrentPlacement({ commit }: { commit: Function }) {
      commit('clearCurrentPlacement')
    },
    resetRace({ commit, state, rootState }: { commit: Function; state: RaceState; rootState: State }) {
      const firstRound = state.program[0]
      const laneItems = firstRound ? createLaneItems(firstRound.horseIds, rootState.horses.horses) : []
      commit('setCurrentRoundIndex', 0)
      commit('setRaceStatus', 'ready')
      commit('clearRaceProgress')
      commit('setInitRaceProgress', laneItems)
      commit('clearCurrentPlacement')
      commit('clearResults')
    },
  },
}
