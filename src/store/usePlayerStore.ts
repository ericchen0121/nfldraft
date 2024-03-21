import { create } from 'zustand'
import { Pick } from '../types/Pick'

interface PlayerStore {
  picks: Pick[]
  selectedPlayerId: number
  setSelectedPlayerId(selectedPlayerId: number): void
  setPicks(picks: Pick[] | any): void
}

const usePlayerStore = create<PlayerStore>((set) => ({
  picks: [],
  selectedPlayerId: 1,
  setSelectedPlayerId: (selectedPlayerId: number) =>
    set(() => ({ selectedPlayerId })),
  setPicks: (picks: Pick[] | any) => {
    if (Array.isArray(picks)) {
      return set(() => ({
        picks,
      }))
    } else {
      // If the argument is not an array, we can't use it as the value for `players`
      return set(() => ({ picks: [] }))
    }
  },
}))

export default usePlayerStore
