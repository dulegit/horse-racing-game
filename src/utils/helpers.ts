import { HORSES, type Horse, type RoundProgram } from '@/types'

function getRandomColor(existingColors: string[] = []): string {
  let color: string
  do {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    color = `rgb(${r}, ${g}, ${b})`
  } while (existingColors.includes(color))
  return color
}

export function generateHorses(count: number): Map<Horse['id'], Horse> {
  const maxCondition = 100

  const horsesMap = new Map<number, Horse>()
  for (let i = 0; i < count; i++) {
    const existingColors = Array.from(horsesMap.values()).map((h) => h.color)
    horsesMap.set(i + 1, {
      id: i + 1,
      name: `Horse ${String(i + 1).padStart(2, '0')}`,
      color: getRandomColor(existingColors),
      condition: Math.floor(Math.random() * maxCondition) + 1,
    })
  }
  return horsesMap
}

export function getRaceSchedule(horses: Map<Horse['id'], Horse>, distance: number[]): RoundProgram[] {
  return distance.map((distance, i) => {
    const shuffledHorses = Array.from(horses.values()).sort(() => 0.5 - Math.random())
    const horseIds = shuffledHorses.slice(0, HORSES.MAX_PER_ROUND).map((h) => h.id)
    return {
      roundId: i + 1,
      distance,
      horseIds,
    }
  })
}

export function createLaneItems(horseIds: number[], horses: Map<Horse['id'], Horse>) {
  return horseIds.map((horseId, index) => {
    const horse = horses.get(horseId)
    if (!horse) {
      throw new Error(`Horse with ID ${horseId} not found in horses map`)
    }
    return {
      horse,
      laneNumber: index + 1,
      progress: 0,
    }
  })
}
