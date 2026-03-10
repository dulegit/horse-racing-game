import { key } from '@/store'
import { DISTANCES } from '@/store/modules/race'
import type { RaceRound } from '@/types'
import { computed, onUnmounted, ref, type ComputedRef } from 'vue'
import { useStore } from 'vuex'

export function useRaceSimulation() {
  const store = useStore(key)

  const intervalId = ref<number | null>(null)
  const timeoutIds = ref<number[]>([])

  const horsesState = computed(() => store.state.horses)
  const raceState = computed(() => store.state.race)

  const isRunning = computed(() => raceState.value.raceStatus === 'running')
  const hasError = computed(() => !!horsesState.value.errorMessage)
  const currentRound: ComputedRef<RaceRound | null> = computed(() => store.getters.currentRoundProgram)

  function step() {
    const allFinished = Array.from(raceState.value.raceProgress.values()).every((progress) => progress.progress >= 100)

    if (!allFinished) {
      currentRound.value?.horseIds.forEach((horseId) => {
        const currentHorse = raceState.value.raceProgress.get(horseId)
        if (!currentHorse) return
        if (currentHorse.progress >= 100) return

        const horseCondition = horsesState.value.horses.get(horseId)?.condition || 50
        const distance = currentRound.value?.distance || 1200
        const percentInrease = calculateHorseProgress(horseCondition, distance)
        store.dispatch('updateRaceProgress', { horseId, progress: Number(percentInrease.toFixed(2)) })
      })
    } else {
      store.dispatch('updateRaceStatus', 'finished')
      const currentRoundIndex = raceState.value.currentRoundIndex ?? 0
      resetAnimation()
      const roundResult: RaceRound = {
        roundId: currentRoundIndex + 1,
        distance: DISTANCES[currentRoundIndex] || 1200,
        horseIds: [...raceState.value.currentRoundPlacement],
      }
      store.dispatch('saveRoundResult', roundResult)
      if (currentRoundIndex < raceState.value.program.length - 1) {
        timeoutIds.value.push(setTimeout(tryNextRound, 500))
      }
    }
  }

  function tryNextRound() {
    const nextRoundIndex = (raceState.value.currentRoundIndex ?? 0) + 1
    if (nextRoundIndex < raceState.value.program.length) {
      store.dispatch('updateCurrentRoundIndex', nextRoundIndex)
      store.dispatch('startNewRound')
      store.dispatch('resetCurrentPlacement')
      timeoutIds.value.push(
        setTimeout(() => {
          store.dispatch('startRace')
          startAnimation()
        }, 500),
      )
    }
  }

  function calculateHorseProgress(condition: number, distance: number) {
    const MIN_SPEED = 14 // m/s
    const MAX_SPEED = 20 // m/s

    const normalized = condition / 100
    const speed = MIN_SPEED + Math.pow(normalized, 1.3) * (MAX_SPEED - MIN_SPEED)
    const tickMs = 100

    return getPercentPerTick(speed, tickMs, distance)
  }

  function getPercentPerTick(speed: number, tickMs: number, raceDistance = 1200) {
    const tickDuration = tickMs / 1000
    const randomFactor = Math.random() * 0.2
    return (speed * tickDuration * 100) / raceDistance + randomFactor
  }

  function startAnimation() {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    intervalId.value = setInterval(step, 30)
  }

  function stopAnimation() {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    timeoutIds.value.forEach(clearTimeout)
    timeoutIds.value = []
  }

  function onProgramTriggered() {
    if (isRunning.value) {
      store.dispatch('pauseRace')
      stopAnimation()
    } else {
      store.dispatch('startRace')
      startAnimation()
    }
  }

  function onResetRace() {
    store.dispatch('resetRace')
    resetAnimation()
  }

  function resetAnimation() {
    stopAnimation()
  }

  onUnmounted(() => {
    stopAnimation()
  })

  return {
    isRunning,
    hasError,
    onProgramTriggered,
    onResetRace,
  }
}
