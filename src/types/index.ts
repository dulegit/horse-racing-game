export enum HORSES {
  MAX_PER_ROUND = 10,
  MAX_GENERATION = 20,
}

export type Horse = {
  id: number
  name: string
  color: string
  condition: number // 1..100
}

export type RoundProgram = {
  roundId: number // 1..6
  distance: number // one of fixed distances
  horseIds: number[] // length 10
}

export type LaneItem = {
  horse: Horse
  laneNumber: number
  progress: number // 0..100
}

type Placement = {
  horseId: number
  timeMs: number
}

export type RoundResult = {
  roundId: number
  distance: number
  horseIds: number[]
}
