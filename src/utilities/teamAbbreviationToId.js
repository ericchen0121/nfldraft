import teams from '../data/teams'

const teamAbbreviationToId = (abbreviation) => {
  const team = teams.find((team) => team.abbreviation === abbreviation)
  return team?.team_id
}

export default teamAbbreviationToId
