import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Pick } from '../types/Pick'

const usePlayerByTeamIdQuery = (
  teamId: Number | undefined,
  options: any = {}
) => {
  const queryOptions = {
    staleTime: 300,
    enabled: !!teamId,
    ...options,
  }

  return useQuery({
    queryKey: ['player-by-team-id', teamId],
    queryFn: async (): Promise<Pick[]> => {
      const data = axios
        .get(
          `https://7fnpc6l8dh.execute-api.us-west-1.amazonaws.com/dev/teams?team_id=${teamId}`
        )
        .then((response) => JSON.parse(response.data.body).data)
        .catch((err) => console.log(err))

      return data
    },
    ...queryOptions,
  })
}

export default usePlayerByTeamIdQuery
