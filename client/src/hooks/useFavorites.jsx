import { useContext, useRef, useEffect } from 'react'
import userDetailContext from '../context/UserDetailContext.js'
import { useQuery } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllFav } from '../utils/api.js'

const useFavorites = () => {
    const { userDetails, setUserDetails } = useContext(userDetailContext)
    const queryRef = useRef()
    const { user } = useAuth0()

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: 'allFavorites',
        queryFn: () => getAllFav(user?.email, userDetails?.token),
        onSuccess: (data) => {
            setUserDetails((prev) => ({ ...prev, favorites: data }))
        },
        enabled: user !== undefined,
        staleTime: 3000,
    })

    queryRef.current = refetch

    useEffect(() => {
        queryRef && queryRef.current()
    }, [userDetails?.token])

    return { data, isLoading, isError, refetch }
}

export default useFavorites
