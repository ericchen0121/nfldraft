import React from 'react'
import usePickPlayerStore from '../store/usePickPlayerStore'

const About = () => {
  // scroll snapping with tailwind: www.youtube.com/watch?v=iVTjsc4B9-I
  const { players, round, roundPick, setRoundPick, setPlayers } =
    usePickPlayerStore()

  return (
    <div className='snap-x snap-mandatory h-screen w-screen flex overflow-y-hidden'>
      {players.map((player) => (
        <div className='snap-always snap-start bg-yellow-200 flex-shrink-0 h-screen w-screen flex items-center justify-center text-5xl'>
          <div
            className='items-center'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div>{player.name}</div>
            <img
              src={`https://static.www.nfl.com/image/private/f_png,q_100,h_800,w_800,c_fill,g_face:center,f_auto/%7B%7Binstance%7D%7D/god-draft-headshots/2024/${player?.image?.nfl_id}`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default About
