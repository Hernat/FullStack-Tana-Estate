import { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../../context/UserDetailContext.js'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api.js'
import useFavorites from '../../hooks/useFavorites'
import useBookings from '../../hooks/useBookings'

//getIdTokenClaims
const Layout = () => {
    useFavorites()
    useBookings()

    const { isAuthenticated, user, getIdTokenClaims } = useAuth0()
    const { setUserDetails } = useContext(UserDetailContext)

    const { mutate } = useMutation({
        mutationKey: [user?.email],
        mutationFn: (token) => createUser(user?.email, token),
    })

    useEffect(() => {
        const getTokenAndRegister = async () => {
            if (isAuthenticated) {
                const res = await getIdTokenClaims()
                localStorage.setItem('access_token', res)
                setUserDetails((prev) => ({ ...prev, token: res }))
                mutate(res)
            }
        }

        isAuthenticated && getTokenAndRegister()
    }, [getIdTokenClaims, isAuthenticated, mutate, setUserDetails])

    return (
        <div>
            <div>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
