import { useContext } from 'react'

import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getProperty } from '../../utils/api.js'
import { PuffLoader } from 'react-spinners'
import { FaShower } from 'react-icons/fa'
import { AiTwotoneCar } from 'react-icons/ai'
import { MdMeetingRoom, MdLocationPin } from 'react-icons/md'
import CurrencyFormat from 'react-currency-format'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useAuth0 } from '@auth0/auth0-react'
import BookingModal from '../../components/BookingModal/BookingModal'
import { useDisclosure } from '@mantine/hooks'
import userDetailContext from '../../context/UserDetailContext.js'
import { Button } from '@mantine/core'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { removeBooking } from '../../utils/api.js'
import Heart from '../../components/Heart/Heart'

import Map from '../../components/Map/Map'

import './Property.css'

const Property = () => {
    const { propertyId } = useParams()
    const { data, isLoading, isError } = useQuery(['rid', propertyId], () =>
        getProperty(propertyId)
    )

    const [opened, { open, close }] = useDisclosure(false)
    const { validateLogin } = useAuthCheck()
    const { user, isAuthenticated } = useAuth0()

    const {
        userDetails: { token, bookings },
        setUserDetails,
    } = useContext(userDetailContext)

    const { mutate: cancelBooking, isLoading: canceling } = useMutation({
        mutationFn: () => removeBooking(propertyId, user?.email, token),
        onSuccess: () => {
            setUserDetails((prev) => ({
                ...prev,
                bookings: prev?.bookings.filter(
                    (booking) => booking?.id !== propertyId
                ),
            }))

            toast.info('Booking cancelled')
        },
    })

    if (isError) {
        return (
            <section className="pro-wrapper">
                <span>Error fetching Data</span>
            </section>
        )
    }

    if (isLoading) {
        return (
            <div className="pro-wrapper flexCenter" style={{ height: '60vh' }}>
                <PuffLoader
                    height="80"
                    width="80"
                    radius={1}
                    color="#1e336c"
                    aria-label="puff-loading"
                />
            </div>
        )
    }

    return (
        <section className="pro-wrapper">
            <div className="flexColStart paddings innerWidth property-container">
                <div className="like">
                    <Heart id={propertyId} />
                </div>

                {/* image  */}
                <img src={data?.image} alt="image property" />

                <div className="flexCenter property-details">
                    {/* left */}
                    <div className="flexColStart left">
                        {/* head */}
                        <div className="flexStart head">
                            <span className="primaryText"> {data?.title} </span>
                            <span
                                className="orangeText"
                                style={{ fontSize: '1.5rem' }}
                            >
                                {' '}
                                <CurrencyFormat
                                    value={data?.price}
                                    displayType={'text'}
                                    thousandSeparator={' '}
                                    suffix={' Ar'}
                                />
                            </span>
                        </div>

                        {/* facilities */}

                        <div className="flexStart facilities">
                            <div className="flexStart facility">
                                <FaShower size={20} color="#1e336c" />
                                <span>
                                    {data.facilities.bathrooms
                                        ? data.facilities.bathrooms
                                        : 0}{' '}
                                    Bathrooms
                                </span>
                            </div>
                            <div className="flexStart facility">
                                <AiTwotoneCar size={20} color="#1e336c" />
                                <span>
                                    {data.facilities.parkings
                                        ? data.facilities.parkings
                                        : 0}{' '}
                                    Parking
                                </span>
                            </div>
                            <div className="flexStart facility">
                                <MdMeetingRoom size={20} color="#1e336c" />
                                <span>
                                    {data.facilities.bedrooms
                                        ? data.facilities.bedrooms
                                        : 0}{' '}
                                    Room/s
                                </span>
                            </div>
                        </div>

                        {/* description */}
                        <div
                            className="secondaryText"
                            style={{ textAlign: 'justify' }}
                        >
                            {data?.description}
                        </div>

                        {/* Address */}
                        <div className="flexStart" style={{ gap: '1rem' }}>
                            <MdLocationPin size={25} color="#1e336c" />
                            <span className="secondaryText">
                                {data?.address} {data?.city} {data?.country}
                            </span>
                        </div>

                        {/* visit */}

                        {bookings
                            ?.map((booking) => booking.id)
                            .includes(propertyId) ? (
                            <>
                                <Button
                                    variant="outline"
                                    color="red"
                                    fullWidth
                                    onClick={() => cancelBooking()}
                                    disable={canceling.toString()}
                                >
                                    <span>Cancel booking</span>
                                </Button>
                                <span className="secondaryText">
                                    Your visit already for date{' '}
                                    {
                                        bookings?.filter(
                                            (booking) =>
                                                booking.id === propertyId
                                        )[0].date
                                    }{' '}
                                </span>
                            </>
                        ) : (
                            <button
                                className="button"
                                onClick={
                                    isAuthenticated
                                        ? open
                                        : () => validateLogin()
                                }
                            >
                                Book your visit
                            </button>
                        )}

                        <BookingModal
                            opened={opened}
                            close={close}
                            propertyId={propertyId}
                            email={user?.email}
                        />
                    </div>

                    {/* right */}
                    <div className="map">
                        <Map
                            address={data?.address}
                            city={data?.city}
                            country={data?.country}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Property
