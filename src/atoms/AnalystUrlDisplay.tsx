interface AnalystUrlDisplayProps {
  url: string
}

interface DisplayDomain {
  [key: string]: string
}

const displayDomains: DisplayDomain = {
  cbssports: 'CBS',
  nfl: 'NFL',
}

const AnalystUrlDisplay = (props: AnalystUrlDisplayProps) => {
  const { url } = props
  const domain = url.split('.')[1]

  return (
    <a href={url} target='_blank'>
      {displayDomains[domain]}
    </a>
  )
}

export default AnalystUrlDisplay
