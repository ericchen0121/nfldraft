import teams from '../data/teams'

const teamColors = (teamId: number): string[] | any[] => {
  const team = teams.find((team) => team.team_id === teamId)
  return [team?.primaryColor, team?.secondaryColor]
}

export default teamColors
