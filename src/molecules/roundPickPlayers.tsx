import { useQuery } from '@tanstack/react-query'
import usePickPlayerStore from '../store/usePickPlayerStore'

const RoundPickPlayers = () => {
  const { players } = usePickPlayerStore()
}

export default RoundPickPlayers
