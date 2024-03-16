import React from 'react'
import teams from '../data/teams'

const TeamIconById: React.FC<{ id: number; size: number }> = ({
  id,
  size = 90,
}) => {
  const teamAbbreviation = teams.find((t) => t.team_id === id)?.abbreviation
  const teamAbbreviationNormalized =
    teamAbbreviation === 'JAC' ? 'JAX' : teamAbbreviation
  return (
    <img
      style={{ width: size, height: size }}
      src={`http://static.www.nfl.com/t_person_squared_mobile/f_auto/league/api/clubs/logos/${teamAbbreviationNormalized}`}
    />
  )
}

export default TeamIconById
