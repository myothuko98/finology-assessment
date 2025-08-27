import { useQuery } from '@tanstack/react-query'
import type { IUser } from '@/types/user'

export function useUsers() {
  return useQuery<Array<IUser>>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      return response.json()
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}
