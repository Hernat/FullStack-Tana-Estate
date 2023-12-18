import { useState, useContext } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import useProperties from '../../hooks/useProperties'
import { PuffLoader } from 'react-spinners'
import '../Properties/Properties.css'
import UserDetailContext from '../../context/UserDetailContext.js'

import PropertyCard from '../../components/PropertyCard/PropertyCard'

function Bookings() {
    const { data, isError, isLoading } = useProperties()
    const [filter, setFilter] = useState('')

    const {
        userDetails: { bookings },
    } = useContext(UserDetailContext)

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
            <div className="paddings innerWidth flexColCenter pro-container">
                <SearchBar filter={filter} setFilter={setFilter} />

                <h1 className="primaryText">Bookings Visits</h1>

                <div
                    className="paddings flexCenter properties"
                    style={{ gap: '1rem' }}
                >
                    {data
                        .filter((property) =>
                            bookings?.bookings
                                .map((booking) => booking.id)
                                .includes(property.id)
                        )
                        .filter(
                            (property) =>
                                property.title
                                    .toLowerCase()
                                    .includes(filter.toLowerCase()) ||
                                property.city
                                    .toLowerCase()
                                    .includes(filter.toLowerCase()) ||
                                property.country
                                    .toLowerCase()
                                    .includes(filter.toLowerCase())
                        )
                        .map((card, index) => (
                            <PropertyCard card={card} key={index} />
                        ))}
                </div>
            </div>
        </section>
    )
}

export default Bookings
