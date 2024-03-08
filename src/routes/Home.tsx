import { useState, useEffect } from 'react'
import roundPickTeams from '../data/roundPickTeams'
import axios from 'axios'
import teamAbbreviationToId from '../utilities/teamAbbreviationToId'

const sortArrayValuesByDate = (a: any, b: any) => {
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
  const [round, setRound] = useState(1)
  const [roundPick, setRoundPick] = useState(1)
  const abbreviation = roundPickTeams[1][roundPick - 1].team_abbreviation
  const team_id = teamAbbreviationToId(abbreviation)
  const [mocks, setMocks] = useState<any[]>([])
  const mockPicks = mocks
    .filter((m) => m?.round_pick === roundPick)
    .sort(sortArrayValuesByDate)

  useEffect(() => {
    axios
      .get(
        `https://7fnpc6l8dh.execute-api.us-west-1.amazonaws.com/dev/teams?team_id=${team_id}`
      )
      .then((response) => {
        setMocks(JSON.parse(response.data.body).data)
      })
      .catch((err) => console.log(err))
  }, [roundPick])

  const iconByAbbreviation = (abbrev: string) => {
    const abbreviationToUse = abbrev === 'JAC' ? 'JAX' : abbrev
    return (
      <img
        style={{ width: 90, height: 90 }}
        src={`http://static.www.nfl.com/t_person_squared_mobile/f_auto/league/api/clubs/logos/${abbreviationToUse}`}
      />
    )
  }

  const PickDisplayRow = ({ pick }: { pick: any }) => {
    const analysisDate = new Date(pick.date)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'flex-start',
          marginBottom: 8,
        }}
      >
        <div style={{ width: 200, flexDirection: 'row', display: 'flex' }}>
          <div>
            <img
              style={{ width: 48, height: 48 }}
              src={`https://static.www.nfl.com/image/private/f_png,q_100,h_240,w_240,c_fill,g_face:center,f_auto/%7B%7Binstance%7D%7D/god-draft-headshots/2024/${pick?.image?.nfl_id}`}
            />
          </div>
          <div style={{ width: 250 }}>
            <div style={{ fontSize: 12 }}>{pick.name}</div>
            <div style={{ fontSize: 9 }}>{pick.school}</div>
          </div>
          <div style={{ fontSize: 18 }}>{pick.position}</div>
        </div>
        <div style={{ marginLeft: 12 }}>
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
        style={{ display: 'flex', marginBottom: 'auto' }}
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
        }}
      >
        <div>NFL MOCK</div>
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
                  style={{ margin: 4 }}
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
