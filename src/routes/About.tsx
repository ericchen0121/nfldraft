import React from 'react'
import usePickPlayerStore from '../store/usePickPlayerStore'
import TeamIconById from '../atoms/TeamIconById'

const About = () => {
  // scroll snapping with tailwind: www.youtube.com/watch?v=iVTjsc4B9-I
  const {
    players,
    order,
    playersByRoundAndPick,
    round,
    roundPick,
    setRoundPick,
    setPlayers,
  } = usePickPlayerStore()

  console.log(playersByRoundAndPick, order)
  return (
    <div className='snap-x snap-mandatory h-screen w-screen flex overflow-y-hidden'>
      {order.map((order) => {
        const analyses = players.filter(
          (mock) => mock.player_id === Number(order)
        )
        const player = analyses[0]

        return (
          <div className='snap-always snap-start flex-shrink-0 h-screen w-screen flex'>
            <div className='grid grid-cols-4 grid-rows-6 gap-4 w-screen'>
              <div className='col-span-2' />
              <div>
                <div className='grid grid-rows-2 gap-4'>
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
                      backgroundColor: 'blue',
                      borderRight: '2rem solid red',
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
              <div className='col-span-4'>
                <div className='grid grid-rows-3 grid-flow-col gap-4'>
                  <div className='row-span-3'></div>
                  <div className='col-span-2'>{player.name}</div>
                  <div className='row-span-2 col-span-2'>{player.position}</div>
                </div>
              </div>
              <div
                className='col-span-4'
                style={{ backgroundColor: 'yellow', height: 80 }}
              >
                <div
                  className='snap-x snap-mandatory w-screen flex overflow-y-hidden'
                  style={{ height: 80 }}
                >
                  {analyses.map((analysis) => (
                    <div className='snap-always flex-shrink-0 snap-start w-screen flex'>
                      {analysis.analysis}
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
