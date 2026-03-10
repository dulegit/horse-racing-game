import { describe, it, expect, vi, afterEach } from 'vitest'
import { fireEvent, cleanup } from '@testing-library/vue'
import AppHeader from '@/components/AppHeader.vue'
import { generateHorses } from '@/utils/helpers'
import { render } from '@/tests/test-utils'

describe('AppHeader', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('disables the Start/Pause button when no race program has been generated', () => {
    const { getByTestId } = render(AppHeader)

    const startBtn = getByTestId('btn-start-pause') as HTMLButtonElement
    expect(startBtn.disabled).toBe(true)
  })

  it('enables Start after Generate is clicked, then shows Pause once the race starts', async () => {
    vi.useFakeTimers()
    const { store, getByTestId } = render(AppHeader)
    store.commit('horses/setHorses', generateHorses(20))

    await fireEvent.click(getByTestId('btn-generate'))

    const startBtn = getByTestId('btn-start-pause') as HTMLButtonElement
    expect(startBtn.disabled).toBe(false)

    await fireEvent.click(startBtn)
    expect(startBtn.textContent?.trim()).toBe('Pause')
  })
})
