import { useEffect } from 'react'
import teams from '../data/teams'
import TeamIconById from '../atoms/TeamIconById'
import usePickPlayerStore from '../store/usePickPlayerStore'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/images/logo.jpg'
import roundPickTeams from '../data/roundPickTeams'

declare global {
  interface Window {
    $hsCollapseCollection: any
  }
}

const Navbar = () => {
  const teamIndexSlices = [
    [0, 8],
    [8, 16],
    [16, 24],
    [24, 32],
  ]
  const { setSelectedTeamId } = usePickPlayerStore()
  const navigate = useNavigate()

  const closeTopNavOnMobile = () => {
    window.$hsCollapseCollection[0]?.element?.hide()
  }

  const handlePressTeam = (teamId: number) => {
    setSelectedTeamId(teamId)
    navigate('/team')
    closeTopNavOnMobile()
  }

  return (
    <header className='flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 sm:py-0 dark:bg-gray-900'>
      <nav
        className='max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8'
        aria-label='Global'
      >
        <div className='relative sm:flex sm:items-center'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-row items-center'>
              <a
                className='flex-none text-xl font-semibold dark:text-white'
                href='#'
              ></a>
              <div className='ml-4 text-gray-200'>NFL Ultimate Draft</div>
            </div>
            <div className='sm:hidden'>
              <button
                type='button'
                className='hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                data-hs-collapse='#navbar-hover-event'
                aria-controls='navbar-hover-event'
                aria-label='Toggle navigation'
              >
                <svg
                  className='hs-collapse-open:hidden flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <line x1='3' x2='21' y1='6' y2='6' />
                  <line x1='3' x2='21' y1='12' y2='12' />
                  <line x1='3' x2='21' y1='18' y2='18' />
                </svg>
                <svg
                  className='hs-collapse-open:block hidden flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
                </svg>
              </button>
            </div>
          </div>

          <div
            id='navbar-hover-event'
            className='hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block'
          >
            <div className='flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
              <div className='hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none]'>
                <button
                  type='button'
                  className='sm:py-4 flex items-center w-full text-gray-600 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  Teams
                  <svg
                    className='ms-2 flex-shrink-0 size-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </button>

                <div className='hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 top-full start-0 min-w-60 bg-white sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute'>
                  <div className='sm:grid sm:grid-cols-4'>
                    {teamIndexSlices.map((slice) => (
                      <div className='flex flex-col'>
                        {teams.slice(slice[0], slice[1]).map((team) => {
                          return (
                            <div
                              onClick={() => handlePressTeam(team.team_id)}
                              className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                            >
                              <span>
                                <TeamIconById id={team.team_id} size={30} />
                              </span>
                              <span>{team.full_name}</span>
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none]'>
                <button
                  type='button'
                  className='sm:py-4 flex items-center w-full text-gray-600 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  Draft Order
                  <svg
                    className='ms-2 flex-shrink-0 size-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </button>

                <div className='hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 top-full start-0 min-w-60 bg-white sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute'>
                  <div className='sm:grid sm:grid-cols-4'>
                    {teamIndexSlices.map((slice) => (
                      <div className='flex flex-col'>
                        {roundPickTeams[1]
                          .slice(slice[0], slice[1])
                          .map((team) => {
                            return (
                              <div
                                onClick={() => handlePressTeam(team.teamId)}
                                className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                              >
                                <span
                                  style={{
                                    fontFamily: 'BarlowCondensed-Medium',
                                    fontSize: 30,
                                  }}
                                >
                                  {team.roundPick}
                                </span>
                                <span>
                                  <TeamIconById id={team.teamId} size={30} />
                                </span>
                                <span>
                                  {
                                    teams.find((t) => t.team_id === team.teamId)
                                      ?.full_name
                                  }
                                </span>
                              </div>
                            )
                          })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
