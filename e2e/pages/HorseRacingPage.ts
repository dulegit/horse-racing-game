import type { Locator, Page } from '@playwright/test'

export class HorseRacingPage {
  readonly page: Page

  // Header controls
  readonly generateBtn: Locator
  readonly startPauseBtn: Locator
  readonly resetBtn: Locator

  // Panels
  readonly horseList: Locator
  readonly raceLanes: Locator

  constructor(page: Page) {
    this.page = page

    this.generateBtn = page.getByTestId('btn-generate')
    this.startPauseBtn = page.getByTestId('btn-start-pause')
    this.resetBtn = page.getByTestId('btn-reset')

    this.horseList = page.getByTestId('horse-list')
    this.raceLanes = page.getByTestId('race-lanes')
  }

  async goto() {
    await this.page.goto('/')
  }

  programRound(n: number): Locator {
    return this.page.getByTestId(`program-round-${n}`)
  }

  resultsRound(n: number): Locator {
    return this.page.getByTestId(`results-round-${n}`)
  }

  async generate() {
    await this.generateBtn.click()
  }

  async start() {
    await this.startPauseBtn.click()
  }

  async pause() {
    await this.startPauseBtn.click()
  }

  async reset() {
    await this.resetBtn.click()
  }

  /** Resolves when the last round's result card appears in the results panel. */
  async waitForRaceToComplete(totalRounds: number, timeout = 30_000) {
    await this.resultsRound(totalRounds).waitFor({ state: 'visible', timeout })
  }
}
