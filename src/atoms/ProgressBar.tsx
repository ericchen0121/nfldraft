interface ProgressBarProps {
  percent: number
}

const ProgressBar = (props: ProgressBarProps) => {
  const { percent } = props
  return (
    <div className='flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700'>
      <div
        className='flex flex-col justify-center rounded-full overflow-hidden bg-teal-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-teal-500'
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
