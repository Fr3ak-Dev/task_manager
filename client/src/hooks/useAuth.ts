import { getUser } from "@/api/Auth.api"
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1, // Attempts to retry the query only 1 time if it fails
        refetchOnWindowFocus: false // Does not refetch when the window regains focus
    })

    return { data, isError, isLoading }
}