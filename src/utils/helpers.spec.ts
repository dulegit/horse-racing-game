import { describe, it, expect } from 'vitest'
import { generateHorses, getRaceSchedule } from '@/utils/helpers'
import { HORSES } from '@/types'

const RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

describe('generateHorses', () => {
  it('creates a Map with the correct number of horses and valid horse data', () => {
    const horses = generateHorses(20)

    expect(horses.size).toBe(20)
    horses.forEach((horse) => {
      expect(horse.name).toMatch(/^Horse \d{2}$/)
      expect(horse.condition).toBeGreaterThanOrEqual(1)
      expect(horse.condition).toBeLessThanOrEqual(100)
      expect(horse.color).toMatch(/^rgb\(/)
    })
  })
})

describe('getRaceSchedule', () => {
  it('creates one round per distance and assigns 10 horses to each round', () => {
    const horses = generateHorses(20)
    const schedule = getRaceSchedule(horses, RACE_DISTANCES)

    expect(schedule).toHaveLength(RACE_DISTANCES.length)
    schedule.forEach((round, index) => {
      expect(round.roundId).toBe(index + 1)
      expect(round.distance).toBe(RACE_DISTANCES[index])
      expect(round.horseIds).toHaveLength(HORSES.MAX_PER_ROUND)
    })
  })
})
