import { useEffect, useRef, useState } from 'react'
import usePickPlayerStore from '../store/usePickPlayerStore'
import TeamIconById from '../atoms/TeamIconById'
import teamColors from '../utilities/teamColors'
import usePlayerByTeamIdQuery from '../hooks/usePlayerByTeamIdQuery'
import roundPickTeams from '../data/roundPickTeams'
import EmptyPlayersForTeam from '../molecules/EmptyPlayersForTeam'

const Team = () => {
  // scroll snapping with tailwind: www.youtube.com/watch?v=iVTjsc4B9-I
  const {
    players: allMocksByTeam,
    order,
    selectedTeamId,
    setPlayers,
  } = usePickPlayerStore()

  // scroll behavior on changing teams
  const [scrolledToFirst, setScrolledToFirst] = useState(false)

  // daisy chaining scroll to first snap element, then first analysis, then to top (ie. showing nav bar)
  useEffect(() => {
    if (scrolledToFirst) {
      scrollToFirstAnalysis()
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        setScrolledToFirst(false)
      }, order.length * 125)
    }
  }, [scrolledToFirst, allMocksByTeam])

  const firstAnalysisSnapRef = useRef<HTMLInputElement>(null)
  const scrollToFirstAnalysis = () => {
    setTimeout(() => {
      firstAnalysisSnapRef?.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      })
    }, order.length * 120)
  }

  const firstPlayerSnapRef = useRef<HTMLInputElement>(null)
  const scrollToFirstPlayer = () => {
    firstPlayerSnapRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    setScrolledToFirst(true)
  }
  const playerByTeamIdQuery = usePlayerByTeamIdQuery(selectedTeamId) // https://tkdodo.eu/blog/react-query-and-type-script

  useEffect(() => {
    if (playerByTeamIdQuery.data) {
      setPlayers(playerByTeamIdQuery.data)
    }
  }, [playerByTeamIdQuery.data])

  useEffect(() => {
    scrollToFirstPlayer()
  }, [allMocksByTeam])

  if (allMocksByTeam.length === 0) {
    return <EmptyPlayersForTeam teamId={selectedTeamId} />
  }

  return (
    <div className='snap-x snap-mandatory h-screen w-screen flex overflow-y-auto'>
      {order.map((playerObj, orderIdx) => {
        const analyses = allMocksByTeam.filter(
          (mock) =>
            mock.player_id === Number(playerObj.playerId) &&
            mock.round === Number(playerObj.round) &&
            mock.round_pick === Number(playerObj.roundPick)
        )
        const player = analyses[0]
        const colors = teamColors(player.team_id)

        const defaultRound = 1

        const roundPickTeam = roundPickTeams[defaultRound].find(
          (x) => x.roundPick === Number(playerObj.roundPick)
        )
        const isTrade = roundPickTeam?.teamId !== player.team_id

        const allMocksAtPick = allMocksByTeam.filter(
          (m) => m.round === player.round && m.round_pick === player.round_pick
        )
        const allMocksForPlayer = allMocksAtPick.filter(
          (m) => m.player_id === player.player_id
        )
        const allMocksAtPosition = allMocksAtPick.filter(
          (m) => m.position === player.position
        )

        const firstPlayerRefProp =
          orderIdx === 0 ? { ref: firstPlayerSnapRef } : {}
        return (
          <div
            {...firstPlayerRefProp}
            className='snap-always snap-start flex-shrink-0 h-screen w-screen flex'
          >
            <div className='grid grid-cols-4 grid-rows-8 gap-4 w-screen'>
              <div className='col-start-1 col-end-4 flex flex-row'>
                <div className='mr-8'>
                  <TeamIconById id={player.team_id} size={100} />
                </div>
                <div className='grid grid-rows-2 mr-4'>
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
                <div className='mt-8'>
                  {isTrade ? (
                    <span className='inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500'>
                      Mock Trade from{' '}
                      <TeamIconById id={roundPickTeam?.teamId} size={24} />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
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
              <div className='col-span-2'>
                <div className='p-2 relative border border-pink-300 rounded-lg m-2'>
                  <div className='text-slate-700'>
                    <span className='text-4xl mr-2'>
                      {Math.floor(
                        (allMocksForPlayer.length / allMocksAtPick.length) * 100
                      )}
                      %
                    </span>
                    <span className='text-xs'>
                      ({allMocksForPlayer.length}/{allMocksAtPick.length})
                    </span>
                  </div>
                  <div className='text-xs text-slate-500'>
                    mocks select {player.name} at Pick {player.round_pick}
                  </div>
                </div>
              </div>
              <div className='col-span-2'>
                <div className='p-2 relative border border-pink-300 rounded-lg m-2'>
                  <div className='text-slate-700'>
                    <span className='text-4xl mr-2'>
                      {Math.floor(
                        (allMocksAtPosition.length / allMocksAtPick.length) *
                          100
                      )}
                      %
                    </span>
                    <span className='text-xs'>
                      ({allMocksAtPosition.length}/{allMocksAtPick.length})
                    </span>
                  </div>
                  <div className='text-xs text-slate-500'>
                    mocks select {player.position} at Pick {player.round_pick}
                  </div>
                </div>
              </div>
              <div className='col-span-2 md:col-span-1'>
                <div className='snap-x snap-mandatory w-screen flex overflow-y-auto'>
                  {analyses.map((analysis, analysisIdx) => {
                    const firstAnalysisRefProp =
                      analysisIdx === 0 && orderIdx === 0
                        ? { ref: firstAnalysisSnapRef }
                        : {}
                    return (
                      <div
                        {...firstAnalysisRefProp}
                        className='snap-always flex-shrink-0 snap-center w-screen md:w-1/3 lg:w-1/4 flex'
                      >
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
                            <div className='flex flex-row justify-between'>
                              <span
                                style={{
                                  fontFamily: 'Lato-Regular',
                                  fontSize: 12,
                                }}
                              >
                                {analysis.analyst}
                              </span>
                              {analysisIdx === 0 && analyses.length === 1 ? (
                                <></>
                              ) : (
                                <span
                                  style={{
                                    fontFamily: 'Lato-Regular',
                                    fontSize: 12,
                                  }}
                                >
                                  {analysisIdx + 1}/{analyses.length}
                                </span>
                              )}
                            </div>
                          </footer>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Team
