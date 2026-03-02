import { expect, test } from '@playwright/test'
import { HorseRacingPage } from './pages/HorseRacingPage'

const TOTAL_ROUNDS = 6

/**
 * End-to-end test covering the complete horse racing game flow:
 *   initial state → generate program → start → pause → resume
 *   → all 6 rounds complete → results verified → reset
 *
 * The simulation tick runs at 30 ms; each round finishes in roughly
 * 2100–2700 ms, with a 1 000 ms transition gap between rounds.
 * A 90 s budget gives plenty of headroom even on slow CI machines.
 */
test('complete game flow: generate, race all 6 rounds, pause/resume, reset', async ({ page }) => {
  test.setTimeout(90_000)

  const app = new HorseRacingPage(page)
  await app.goto()

  // ── 1. Initial state ─────────────────────────────────────────────────
  // Horses are generated on mount; the list should already be populated.
  await expect(app.horseList).toBeVisible()
  // Generate is available immediately; Start requires a program first.
  await expect(app.generateBtn).toBeEnabled()
  await expect(app.startPauseBtn).toBeDisabled()

  // ── 2. Generate program ──────────────────────────────────────────────
  await app.generate()

  // All 6 program rounds must appear in the program panel.
  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    await expect(app.programRound(round)).toBeVisible()
  }
  // Start unlocks once a program exists.
  await expect(app.startPauseBtn).toBeEnabled()
  await expect(app.startPauseBtn).toHaveText('Start')

  // ── 3. Start the race ────────────────────────────────────────────────
  await app.start()

  await expect(app.startPauseBtn).toHaveText('Pause')
  // Race lanes with horses should be visible on the track.
  await expect(app.raceLanes).toBeVisible()

  // ── 4. Pause mid-race ────────────────────────────────────────────────
  await app.pause()
  await expect(app.startPauseBtn).toHaveText('Start')

  // ── 5. Resume ────────────────────────────────────────────────────────
  await app.start()
  await expect(app.startPauseBtn).toHaveText('Pause')

  // ── 6. Wait for all 6 rounds to complete ─────────────────────────────
  // The race runs autonomously; each subsequent round starts automatically.
  await app.waitForRaceToComplete(TOTAL_ROUNDS, 60_000)

  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    await expect(app.resultsRound(round)).toBeVisible()
  }

  // ── 7. Reset ─────────────────────────────────────────────────────────
  await app.reset()

  // Results are cleared; program is preserved so Start stays enabled.
  await expect(app.resultsRound(1)).not.toBeVisible()
  await expect(app.programRound(1)).toBeVisible()
  await expect(app.startPauseBtn).toHaveText('Start')
  await expect(app.startPauseBtn).toBeEnabled()
})
