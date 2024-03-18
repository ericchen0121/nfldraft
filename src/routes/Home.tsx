import { useEffect } from 'react'
import roundPickTeams from '../data/roundPickTeams'
import teamAbbreviationToId from '../utilities/teamAbbreviationToId'
import usePickPlayerStore from '../store/usePickPlayerStore'
import usePlayerByTeamIdQuery from '../hooks/usePlayerByTeamIdQuery'
import { Pick } from '../types/Pick'

interface IncludesDate {
  date: string
}

const sortArrayValuesByDate = (a: IncludesDate, b: IncludesDate) => {
  var dateA = new Date(a.date)
  var dateB = new Date(b.date)

  if (dateA < dateB) {
    return 1
  }
  if (dateA > dateB) {
    return -1
  }
  return 0
}

const Home = () => {
  const { players, round, roundPick, setRoundPick, setPlayers } =
    usePickPlayerStore()
  const abbreviation: string = roundPickTeams[1][roundPick - 1].teamAbbreviation
  const teamId = teamAbbreviationToId(abbreviation)
  const playerByTeamIdQuery = usePlayerByTeamIdQuery(teamId) // https://tkdodo.eu/blog/react-query-and-type-script

  const mockPicks = players
    .filter((m) => m?.round_pick === roundPick)
    .sort(sortArrayValuesByDate)

  useEffect(() => {
    if (playerByTeamIdQuery.isSuccess) {
      setPlayers(playerByTeamIdQuery.data)
    }
  }, [playerByTeamIdQuery.isSuccess])

  const iconByAbbreviation = (abbrev: string) => {
    const abbreviationToUse = abbrev === 'JAC' ? 'JAX' : abbrev
    return (
      <img
        style={{ width: 90, height: 90 }}
        src={`http://static.www.nfl.com/t_person_squared_mobile/f_auto/league/api/clubs/logos/${abbreviationToUse}`}
      />
    )
  }

  const PickDisplayRow = ({ pick }: { pick: Pick }) => {
    const analysisDate = new Date(pick.date)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'flex-start',
          marginBottom: 8,
          width: '100vw',
        }}
      >
        <div style={{ width: 200, flexDirection: 'row', display: 'flex' }}>
          <div>
            <img
              style={{ width: 48, height: 48, marginLeft: 12, marginRight: 12 }}
              src={`https://static.www.nfl.com/image/private/f_png,q_100,h_120,w_120,c_fill,g_face:center,f_auto/%7B%7Binstance%7D%7D/god-draft-headshots/2024/${pick?.image?.nfl_id}`}
            />
          </div>
          <div style={{ width: 250 }}>
            <div style={{ fontSize: 14 }}>{pick.name}</div>
            <div style={{ fontSize: 9 }}>{pick.school}</div>
          </div>
          <div style={{ fontSize: 18 }}>{pick.position}</div>
        </div>
        <div
          style={{ marginLeft: 12, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ fontSize: 12 }}>{pick.analysis}</div>
          <div style={{ fontSize: 10 }}>
            -{pick.analyst} {analysisDate.getMonth() + 1}/
            {analysisDate.getDate()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: '#013369',
        flex: 1,
        display: 'flex',
        width: '100%',
        height: '99vh',
        flexDirection: 'column',
        alignItems: 'flex-end',
        color: 'white',
      }}
    >
      <div
        className='top-container'
        style={{ display: 'flex', marginBottom: 'auto', marginTop: 100 }}
      >
        <div>
          {mockPicks.map((mock) => {
            return <PickDisplayRow pick={mock} />
          })}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          height: 150,
          alignItems: 'center',
        }}
      >
        <div>
          <img
            src='https://static.www.nfl.com/image/upload/v1554321393/league/nvfr7ogywskqrfaiu38m.svg'
            style={{ height: 90, width: 90 }}
          />
        </div>
        <div
          style={{
            width: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>{iconByAbbreviation(abbreviation)}</div>
          <div>{abbreviation}</div>
        </div>
        <div>
          <span style={{ marginRight: 8 }}>
            <span style={{ marginRight: 4 }}>RD</span>
            <span>{round}</span>
          </span>
          <span>
            <span style={{ marginRight: 4 }}>PK</span>
            <span>{roundPick}</span>
          </span>
        </div>
        <div style={{ marginLeft: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {[...Array(32).keys()].map((number) => {
              return (
                <div
                  onClick={() => {
                    setRoundPick(number + 1)
                  }}
                  style={{ margin: 4, cursor: 'pointer' }}
                >
                  {number + 1}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
