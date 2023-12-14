/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { DatePicker } from '@mantine/dates'
import { useMutation } from 'react-query'
import { Modal, Button } from '@mantine/core'
import userDetailContext from '../../context/UserDetailContext.js'
import { bookVisit } from '../../utils/api.js'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import('@mantine/dates/styles.css')

const BookingModal = ({ opened, close, email, propertyId }) => {
    const [value, setValue] = useState()
    const {
        userDetails: { token },
        setUserDetails,
    } = useContext(userDetailContext)

    const { mutate, isLoading } = useMutation({
        mutationFn: () => bookVisit(value, propertyId, email, token),
        onSuccess: (data) => handleBookingSuccess(data),
        onSettled: () => close(!opened),
    })

    const handleBookingSuccess = (data) => {
        if (data) {
            data.status === 203
                ? toast.warning(data.message)
                : toast.success(data.message)
        }
        setUserDetails((prev) => ({
            ...prev,
            bookings: [
                ...prev.bookings,
                {
                    id: propertyId,
                    date: dayjs(value).format('DD/MM/YYYY'),
                },
            ],
        }))
    }

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Select your date of visit"
            centered
        >
            <div className="flexColCenter" style={{ gap: '1rem' }}>
                <DatePicker
                    allowDeselect
                    value={value}
                    onChange={setValue}
                    minDate={new Date()}
                />

                <Button
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'orange', deg: 90 }}
                    disabled={!value || isLoading}
                    onClick={() => mutate()}
                >
                    Book visit
                </Button>
            </div>
        </Modal>
    )
}

export default BookingModal
