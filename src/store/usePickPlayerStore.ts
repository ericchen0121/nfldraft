import { create } from 'zustand'
import { Pick } from '../types/Pick'
import { orderPlayers } from './orderPlayers'

interface GroupedRound {
  [key: number]: GroupedRoundPick
}

interface GroupedRoundPick {
  [key: number]: GroupedPlayerId
}

interface GroupedPlayerId {
  [key: number]: Pick[]
}

interface PickPlayerStore {
  round: number
  roundPick: number
  players: Pick[]
  playersByRoundAndPick: GroupedRound
  order: number[]
  setRound(round: number): void
  setRoundPick(roundPick: number): void
  setPlayers(players: Pick[] | any): void
}

const groupPlayersByRoundAndPick = (players: Pick[]) => {
  const groupedPlayers: GroupedRound = {}

  players.forEach((player: Pick) => {
    if (!groupedPlayers[player.round]) {
      groupedPlayers[player.round] = {}
    }
    if (!groupedPlayers[player.round][player.round_pick]) {
      groupedPlayers[player.round][player.round_pick] = {}
    }
    if (!groupedPlayers[player.round][player.round_pick][player.player_id]) {
      groupedPlayers[player.round][player.round_pick][player.player_id] = []
    }
    groupedPlayers[player.round][player.round_pick][player.player_id].push(
      player
    )
  })

  return groupedPlayers
}

const usePickPlayerStore = create<PickPlayerStore>((set) => ({
  round: 1,
  roundPick: 1,
  players: [],
  order: [],
  playersByRoundAndPick: {},
  setRound: (round: number) => set(() => ({ round })),
  setRoundPick: (roundPick: number) => set(() => ({ roundPick })),
  setPlayers: (players: Pick[] | any) => {
    if (Array.isArray(players)) {
      return set(() => ({
        players,
        playersByRoundAndPick: groupPlayersByRoundAndPick(players),
        order: orderPlayers(groupPlayersByRoundAndPick(players)),
      }))
    } else {
      // If the argument is not an array, we can't use it as the value for `players`
      return set(() => ({ players: [] }))
    }
  },
}))

export default usePickPlayerStore
