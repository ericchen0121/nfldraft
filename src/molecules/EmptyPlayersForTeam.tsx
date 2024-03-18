import TeamIconById from '../atoms/TeamIconById'

const EmptyPlayersForTeam = ({ teamId }) => {
  return (
    <>
      <div className='grid grid-cols-4 grid-rows-8 gap-4 w-screen'>
        <div className='col-start-1 col-end-8 flex flex-row items-center'>
          <div className='mr-8'>
            <TeamIconById id={teamId} size={100} />
          </div>
          <div
            style={{
              fontFamily: 'BarlowCondensed-Regular',
              fontSize: 28,
            }}
          >
            <div>No 1st Round Pick</div>
            <div style={{ fontSize: 22 }}>Select another team</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmptyPlayersForTeam
