export type Horse = {
  id: number
  name: string
  color: string
  condition: number // 1..100
}

export type RoundProgram = {
  roundIndex: number // 1..6
  distance: number // one of fixed distances
  horseIds: number[] // length 10
}

type Placement = {
  horseId: number
  timeMs: number
}

export type RoundResult = {
  roundIndex: number
  distance: number
  placements: Placement[]
}
