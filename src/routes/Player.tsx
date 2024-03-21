import { useEffect, useState } from 'react'
import usePlayerByPlayerIdQuery from '../hooks/usePlayerByPlayerIdQuery'
import usePlayerStore from '../store/usePlayerStore'
import { Pick } from '../types/Pick'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts'
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent'
import TeamIconById from '../atoms/TeamIconById'
import teamColors from '../utilities/teamColors'

const Player = () => {
  const { picks, selectedPlayerId, setPicks } = usePlayerStore()
  const [selectedPick, setSelectedPick] = useState<Pick | any>()

  const playerByPlayerIdQuery = usePlayerByPlayerIdQuery(selectedPlayerId) // https://tkdodo.eu/blog/react-query-and-type-script
  useEffect(() => {
    if (playerByPlayerIdQuery.data) {
      setPicks(playerByPlayerIdQuery.data)
    }
  }, [playerByPlayerIdQuery.data])

  const player = picks?.[0]
  const colors = selectedPick
    ? teamColors(selectedPick.team_id)
    : ['lightBlue', 'darkBlue']
  const sortedPicks = picks.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  )

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      const pick = payload?.[0].payload

      return (
        <div className='custom-tooltip'>
          <p className='label'>{`PK: ${pick.round_pick}`}</p>
          <p className='desc'>
            <TeamIconById id={pick.team_id} size={30} />
          </p>
        </div>
      )
    }

    return null
  }

  if (!player) {
    return <></>
  }

  return (
    <div className='grid grid-cols-12 grid-rows-12 gap-1 w-screen'>
      <div id='player-header' className='col-span-12 row-span-2'>
        <div
          style={{
            position: 'relative',
            height: '100%',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '40vw',
              minWidth: 160,
              maxWidth: 200,
              transformOrigin: '100% 0',
              transform: 'skewX(-15deg)',
              backgroundColor: `${colors[0]}`,
              borderRight: `2rem solid ${colors[1]}`,
              zIndex: 1,
              transition: 'all 300ms',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 200,
              bottom: 0,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontFamily: 'BarlowCondensed-Medium',
                color: 'rgb(13,93,130)',
              }}
            >
              {player.name}{' '}
              <span style={{ all: 'revert', fontSize: 12 }}>View</span>
            </div>
            <div
              style={{
                fontSize: 18,
                fontFamily: 'BarlowCondensed-Medium',
                color: 'rgb(13,93,130)',
              }}
            >
              {player.position}
            </div>
            <div
              style={{
                fontSize: 16,
                fontFamily: 'BarlowCondensed-Regular',
                color: 'black',
              }}
            >
              {player.school}
            </div>
          </div>
          <img
            style={{
              position: 'absolute',
              zIndex: 3,
              height: '100%',
            }}
            src={`https://static.www.nfl.com/image/private/f_png,q_100,h_400,w_400,c_fill,g_face:center,f_auto/%7B%7Binstance%7D%7D/god-draft-headshots/2024/${player?.image?.nfl_id}`}
          />
        </div>
      </div>
      <div id='player-header' className='col-span-12 mt-4 row-span-3'>
        <ResponsiveContainer width='100%' height={200}>
          <LineChart
            width={1000}
            height={400}
            data={sortedPicks}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            onMouseMove={(state) => {
              console.log('state', state)
              if (state.isTooltipActive) {
                setSelectedPick(state?.activePayload?.[0]?.payload)
              }
            }}
          >
            <XAxis
              dataKey='date'
              allowDecimals={false}
              hide
              label={{
                value: 'Date',
                angle: -90,
                position: 'inside',
              }}
            />
            <YAxis
              domain={[1, 32]}
              interval={0}
              label={{
                value: 'Pick of Round 1',
                angle: -90,
                position: 'inside',
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type='monotone'
              dataKey='round_pick'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {selectedPick && (
        <>
          <div className='col-span-6'>
            <TeamIconById id={selectedPick.team_id} size={80} />
            <div className='grid grid-rows-2 mr-4'>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: 12 }}>
                  <div
                    style={{
                      fontFamily: 'BarlowCondensed-Regular',
                      fontSize: 40,
                    }}
                  >
                    {selectedPick.round_pick}
                  </div>
                  <div
                    style={{
                      fontFamily: 'BarlowCondensed-Regular',
                      fontSize: 18,
                    }}
                  >
                    PK
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'BarlowCondensed-Regular',
                      fontSize: 40,
                    }}
                  >
                    {selectedPick.round}
                  </div>
                  <div
                    style={{
                      fontFamily: 'BarlowCondensed-Regular',
                      fontSize: 18,
                    }}
                  >
                    RD
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-6'>{selectedPick.analysis}</div>
        </>
      )}
    </div>
  )
}

export default Player
