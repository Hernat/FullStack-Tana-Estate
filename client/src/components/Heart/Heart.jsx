/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import userDetailContext from '../../context/UserDetailContext.js'
import { toFav } from '../../utils/api.js'
import { updateFavorites, checkFavorites } from '../../utils/common.js'

const Heart = ({ id }) => {
    const [heartColor, setHeartColor] = useState('white')
    const { validateLogin } = useAuthCheck()

    const {
        userDetails: { favorites, token },
        setUserDetails,
    } = useContext(userDetailContext)
    const { user } = useAuth0()

    useEffect(() => {
        setHeartColor(() => checkFavorites(id, favorites))
    }, [favorites, id])

    const { mutate } = useMutation({
        mutationFn: () => toFav(id, user?.email, token),
        onSuccess: () => {
            setUserDetails((prev) => ({
                ...prev,
                favorites: updateFavorites(id, prev.favorites),
            }))
        },
    })

    const handleLike = () => {
        if (validateLogin()) {
            mutate()
            setHeartColor((prev) => (prev === '#fa3e5f' ? 'white' : '#fa3e5f'))
        }
    }

    return (
        <AiFillHeart
            size={25}
            color={heartColor}
            onClick={(e) => {
                e.stopPropagation()
                handleLike()
            }}
        />
    )
}

export default Heart
