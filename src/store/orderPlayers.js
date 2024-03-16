export const orderPlayers = (groupedPlayers) => {
  const order = []
  // Add an 'order' key to the round_pick that is an array of numbers that orders the player_ids by the length of the Players array, from most to least
  Object.entries(groupedPlayers).forEach(([round, picks]) => {
    Object.entries(picks).forEach(([pick, players]) => {
      // Order the player_ids by the length of the Players array, from most to least
      const playerIds = Object.keys(players)
        .map((playerId) => ({ playerId, length: players[playerId].length }))
        .sort((a, b) => b.length - a.length)
        .map((obj) => obj.playerId)
      order.push(...playerIds)
    })
  })

  return order
}
