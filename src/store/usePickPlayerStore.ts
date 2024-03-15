import { create } from 'zustand'
import { Pick } from '../types/Pick'

interface PickPlayerStore {
  round: number
  roundPick: number
  players: Pick[]
  setRound(round: number): void
  setRoundPick(roundPick: number): void
  setPlayers(players: Pick[] | any): void
}

const usePickPlayerStore = create<PickPlayerStore>((set) => ({
  round: 1,
  roundPick: 1,
  players: [],
  setRound: (round: number) => set(() => ({ round })),
  setRoundPick: (roundPick: number) => set(() => ({ roundPick })),
  setPlayers: (players: Pick[]) => set(() => ({ players })),
}))

export default usePickPlayerStore
