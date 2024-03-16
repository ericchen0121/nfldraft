import React from 'react'
import usePickPlayerStore from '../store/usePickPlayerStore'
import TeamIconById from '../atoms/TeamIconById'
import teamColors from '../utilities/teamColors'

const About = () => {
  // scroll snapping with tailwind: www.youtube.com/watch?v=iVTjsc4B9-I
  const {
    players: allMocksByTeam,
    order,
    playersByRoundAndPick,
    round,
    roundPick,
    setRoundPick,
    setPlayers,
  } = usePickPlayerStore()

  console.log('playersbyround', allMocksByTeam)
  return (
    <div className='snap-x snap-mandatory h-screen w-screen flex overflow-y-hidden'>
      {order.map((order) => {
        const analyses = allMocksByTeam.filter(
          (mock) => mock.player_id === Number(order)
        )
        const player = analyses[0]
        const colors = teamColors(player.team_id)

        // stats
        // Other players at position mocked
        // % Analysts mock

        // find total mock picks at the position
        const allMocksAtPick = allMocksByTeam.filter(
          (m) => m.round === player.round && m.round_pick === player.round_pick
        )
        const allMocksForPlayer = allMocksAtPick.filter(
          (m) => m.player_id === player.player_id
        )

        console.log((allMocksForPlayer.length / allMocksAtPick.length) * 100)

        return (
          <div className='snap-always snap-start flex-shrink-0 h-screen w-screen flex'>
            <div className='grid grid-cols-4 grid-rows-6 gap-4 w-screen'>
              <div className='col-span-2' />
              <div>
                <div className='grid grid-rows-2'>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginRight: 12 }}>
                      <div
                        style={{
                          fontFamily: 'BarlowCondensed-Regular',
                          fontSize: 40,
                        }}
                      >
                        {player.round_pick}
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
                        {player.round}
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
                  <div style={{ fontSize: 10 }}>{player.extra_info}</div>
                </div>
              </div>
              <div>
                <TeamIconById id={player.team_id} size={80} />
              </div>
              <div className='col-span-4'>
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
                      backgroundColor: colors[0],
                      borderRight: `2rem solid ${colors[1]}`,
                      zIndex: 1,
                    }}
                  ></div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 20,
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
                      {player.name}
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
              <div className='col-span-2 md:col-span-1'>
                <div className='p-2 relative border border-pink-300 rounded-lg m-2'>
                  <div className='text-slate-700'>
                    <span className='text-4xl'>
                      {Math.floor(
                        (allMocksForPlayer.length / allMocksAtPick.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className='text-xs text-slate-500'>
                    {allMocksForPlayer.length} of {allMocksAtPick.length} mock
                    drafts select {player.name} at Pick {player.round_pick}
                  </div>
                </div>
                <div className='snap-x snap-mandatory w-screen flex overflow-y-hidden'>
                  {analyses.map((analysis) => (
                    <div className='snap-always flex-shrink-0 snap-center w-screen md:w-1/3 lg:w-1/4 flex'>
                      <div className='p-8 relative border border-sky-400 rounded-2xl m-2'>
                        <span
                          style={{
                            fontFamily: 'Lato-Italic',
                            fontSize: 40,
                            lineHeight: 0.7,
                            color: colors[1],
                            position: 'absolute',
                            top: 28,
                            left: 8,
                          }}
                        >
                          "
                        </span>
                        <span
                          style={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 15,
                          }}
                        >
                          {analysis.analysis}
                        </span>
                        <footer className='mt-4'>
                          <span
                            style={{
                              fontFamily: 'Lato-Regular',
                              fontSize: 12,
                            }}
                          >
                            {analysis.analyst}
                          </span>
                        </footer>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default About
