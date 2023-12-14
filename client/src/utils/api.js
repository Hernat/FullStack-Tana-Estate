import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export const getAllProperties = async () => {
    try {
        const response = await api.get('/residency/allResidencies', {
            timeout: 10 * 1000,
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error('Something Error')
        throw error
    }
}

export const getProperty = async (rid) => {
    try {
        const residency = await api.get(`/residency/${rid}`, {
            timeout: 10 * 1000,
        })

        if (residency.status == 400 || residency.status == 500) {
            throw residency.data
        }

        return residency.data
    } catch (error) {
        toast.error('Something Error')
        throw error
    }
}

export const createUser = async (email, token) => {
    try {
        await api.post(
            '/user/register',
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}

export const bookVisit = async (date, propertyId, email, token) => {
    try {
        const { data, status } = await api.post(
            `/user/bookVisit/${propertyId}`,
            {
                email,
                id: propertyId,
                date: dayjs(date)
                    .locale('Indian/Antananarivo')
                    .format('DD/MM/YYYY'),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return { message: data.message, status: status }
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}

export const removeBooking = async (id, email, token) => {
    try {
        await api.post(
            `/user/removeBooking/${id}`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}

export const toFav = async (id, email, token) => {
    try {
        await api.post(
            `/user/toFav/${id}`,
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}

export const getAllFav = async (email, token) => {
    if (!token) return

    try {
        const res = await api.post(
            '/user/allFav',
            { email },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return res.data['favResidenciesID']
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}

// get all getAllBookings

export const getAllBookings = async (email, token) => {
    if (!token) return
    try {
        const response = await api.post(
            '/user/allBookings',
            {
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response.data['bookVisits']
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}

export const createResidency = async (data) => {
    try {
        const res = await api.post('/residency/create', { data })
        return res.data
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}

// delete residency

export const deleteResidency = async (id, email) => {
    try {
        const res = await api.post(`/residency/deleteResidency/${id}`, {
            email,
        })

        return res.data
    } catch (error) {
        toast.error('Something went wrong, Please try again')
        throw error
    }
}
