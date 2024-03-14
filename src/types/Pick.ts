export interface NFLImageObject {
  nfl_id: string
}

export interface Pick {
  round_pick: number
  date: string
  image: NFLImageObject
  name: string
  school: string
  position: string
  analysis: string
  analyst: string
  analyst_source_id: number
  extra_info: string
  player_id: number
  round: number
  team_id: number
  url: string
}
