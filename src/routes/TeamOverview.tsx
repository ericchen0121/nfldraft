import TeamIconById from '../atoms/TeamIconById'
import usePickPlayerStore from '../store/usePickPlayerStore'
import Team from './Team'
import roundPickTeams from '../data/roundPickTeams'

const TeamOverview = () => {
  const { players, selectedTeamId } = usePickPlayerStore()
  const x = 10
  const lastXMocks = players.slice(-x)
  const round = 1
  const picks = roundPickTeams[round].filter((x) => x.teamId === selectedTeamId)

  return (
    <>
      <div className='flex w-screen justify-center'>
        <div>
          <TeamIconById id={selectedTeamId} size={100} />
        </div>
        <div>{picks.length} picks in Round 1</div>
      </div>
      <div>
        <div>Last {x} drafts</div>
        {lastXMocks.map((p) => (
          <div>{p.name}</div>
        ))}
      </div>
    </>
  )
}

export default TeamOverview
