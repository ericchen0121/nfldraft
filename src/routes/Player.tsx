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
import AnalystUrlDisplay from '../atoms/AnalystUrlDisplay'
import { format } from 'date-fns'

interface Stat {
  max: number
  min: number
  mode: number
  average: number
}
const Player = () => {
  const { picks, selectedPlayerId, setPicks } = usePlayerStore()
  const [selectedPick, setSelectedPick] = useState<Pick | any>()
  const [stats, setStats] = useState<Stat>({
    max: -1,
    min: -1,
    mode: -1,
    average: -1,
  })
  const playerByPlayerIdQuery = usePlayerByPlayerIdQuery(selectedPlayerId) // https://tkdodo.eu/blog/react-query-and-type-script
  useEffect(() => {
    if (playerByPlayerIdQuery.data) {
      setPicks(playerByPlayerIdQuery.data)
    }
  }, [playerByPlayerIdQuery.data])

  const minModeMaxAverage = (array: Pick[]): Stat => {
    // Extract round_pick values from objects in the array
    const roundPicks = array.map((obj) => obj.round_pick)

    // Find the minimum value
    const min = Math.min(...roundPicks)

    // Find the mode value
    let mode
    let maxCount = 0
    let counts = {}
    for (const value of roundPicks) {
      if (!counts[value]) {
        counts[value] = 0
      }
      counts[value]++
      if (counts[value] > maxCount) {
        maxCount = counts[value]
        mode = value
      }
    }

    // Find the maximum value
    const max = Math.max(...roundPicks)

    // Find the average value
    const sum = roundPicks.reduce((acc, val) => acc + val, 0)
    const average = sum / roundPicks.length

    return { min, mode, max, average }
  }

  useEffect(() => {
    if (picks?.length) {
      setSelectedPick(picks[picks?.length - 1])
      setStats(minModeMaxAverage(picks))
    }
  }, [picks])

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
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      const pick = payload?.[0].payload

      return (
        <div className='custom-tooltip bg-slate-100 flex flex-row items-center rounded'>
          <span className='desc mr-2'>
            <TeamIconById id={pick.team_id} size={40} />
          </span>
          <div className='mr-1'>
            <div
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 24,
              }}
            >
              {pick.round_pick}
            </div>
            <div
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 14,
              }}
            >
              PK
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  if (!player) {
    return <></>
  }

  return (
    <div className='grid grid-cols-12 grid-rows-12 gap-1 w-screen h-screen'>
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
      <div className='col-span-3 grid grid-rows-6 ml-1'>
        <div className='row-span-1 ml-1' style={{ fontSize: 8 }}>
          Highest Pick
        </div>
        <div className='row-span-5 p-1 relative border border-pink-300 rounded-lg'>
          <div className='flex flex-row items-center justify-center'>
            <div
              className='mr-2'
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 28,
              }}
            >
              {stats.min}
            </div>
            <div
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 28,
              }}
            >
              PK
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-3 grid grid-rows-6'>
        <div className='row-span-1 ml-1' style={{ fontSize: 8 }}>
          Lowest Pick
        </div>
        <div className='row-span-5 p-1 relative border border-pink-300 rounded-lg'>
          <div className='flex flex-row items-center justify-center'>
            <div
              className='mr-2'
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 28,
              }}
            >
              {stats.max}
            </div>
            <div
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 28,
              }}
            >
              PK
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-3 grid grid-rows-6'>
        <div className='row-span-1 ml-1' style={{ fontSize: 8 }}>
          Most Picked
        </div>
        <div className='row-span-5 p-1 relative border border-pink-300 rounded-lg'>
          <div className='flex flex-row items-center justify-center'>
            <div
              className='mr-2'
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 28,
              }}
            >
              {stats.mode}
            </div>
            <div
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 28,
              }}
            >
              PK
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-3 grid grid-rows-6 mr-1'>
        <div className='row-span-1 ml-1' style={{ fontSize: 8 }}>
          Average Pick
        </div>
        <div className='row-span-5 p-1 relative border border-pink-300 rounded-lg'>
          <div className='flex flex-row items-center justify-center'>
            <div
              className='mr-2'
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 28,
              }}
            >
              {stats.average.toFixed(2)}
            </div>
            <div
              style={{
                fontFamily: 'BarlowCondensed-Regular',
                fontSize: 28,
              }}
            >
              PK
            </div>
          </div>
        </div>
      </div>
      <div id='chart-container' className='col-span-12 mt-4 row-span-2 mb-4'>
        <ResponsiveContainer width='100%' height={'100%'}>
          <LineChart
            width={200}
            height={400}
            data={sortedPicks}
            margin={{
              top: 4,
              right: 20,
              left: 20,
              bottom: 4,
            }}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setSelectedPick(state?.activePayload?.[0]?.payload)
              }
            }}
            onClick={(state) => {
              if (state) {
                setSelectedPick(state?.activePayload?.[0]?.payload)
              }
            }}
          >
            <XAxis
              dataKey='date'
              allowDecimals={false}
              tick={false}
              label={{
                value: 'Date',
                angle: 0,
                position: 'insideBottomRight',
                fontFamily: 'Lato-Regular',
                fontSize: 12,
              }}
            />
            <YAxis
              domain={['dataMin', 'dataMax']}
              allowDecimals={false}
              interval={0}
              label={{
                value: 'Pick #',
                angle: -90,
                position: 'insideBottomLeft',
                fontFamily: 'Lato-Regular',
                fontSize: 12,
              }}
              padding={{ top: 8, bottom: 8 }}
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
          <div id='selected-pick-team' className='col-span-3'>
            <TeamIconById id={selectedPick.team_id} size={80} />
            <div className='grid grid-rows-2 mr-4'>
              <div
                className='ml-4'
                style={{ display: 'flex', flexDirection: 'row' }}
              >
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
          <div id='selected-pick-analysis' className='col-span-9 mr-4'>
            <span
              style={{
                fontFamily: 'Lato-Regular',
                fontSize: 15,
              }}
            >
              {selectedPick.analysis}
            </span>
            <div className='flex flex-col mt-4'>
              <span
                style={{
                  fontFamily: 'Lato-Regular',
                  fontSize: 12,
                }}
              >
                {selectedPick.analyst}
              </span>
              <div className='flex flex-row items-center'>
                <span className='mr-2' style={{ fontSize: 10 }}>
                  <AnalystUrlDisplay url={selectedPick.url} />
                </span>
                <span
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 10,
                  }}
                >
                  {format(selectedPick.date, 'M/dd/yyyy')}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Player
