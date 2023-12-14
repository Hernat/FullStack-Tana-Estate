import { useState } from 'react'
import '../Properties/Properties.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import useProperties from '../../hooks/useProperties'
import { PuffLoader } from 'react-spinners'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mantine/core'
import { MdDeleteForever } from 'react-icons/md'
import { useMutation } from 'react-query'
import { deleteResidency } from '../../utils/api.js'
import { toast } from 'react-toastify'

import PropertyCard from '../../components/PropertyCard/PropertyCard'

function Properties() {
    const {
        data,
        isError,
        isLoading,
        refetch: refetchProperties,
    } = useProperties()
    const [filter, setFilter] = useState('')
    const { user } = useAuth0()

    const { mutate } = useMutation({
        mutationFn: (id) => deleteResidency(id, user?.email),
        onSuccess: (data) => {
            refetchProperties()
            toast.success(data)
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
            <div className="paddings innerWidth flexColCenter pro-container">
                <SearchBar filter={filter} setFilter={setFilter} />

                <h1 className="primaryText">My Properties</h1>

                <div
                    className="paddings flexCenter properties"
                    style={{ gap: '1rem' }}
                >
                    {data
                        .filter((property) =>
                            property.userEmail
                                .toLowerCase()
                                .includes(user?.email)
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
                            <div key={index}>
                                <PropertyCard card={card} key={index} />
                                <Button
                                    variant="filled"
                                    color="red"
                                    size="xs"
                                    radius="md"
                                    style={{ marginTop: '5px' }}
                                    leftSection={<MdDeleteForever size={14} />}
                                    onClick={() => mutate(card.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    )
}

export default Properties
