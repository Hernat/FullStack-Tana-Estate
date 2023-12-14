/* eslint-disable react/prop-types */
import { useForm } from '@mantine/form'
import { validateString } from '../../utils/common.js'
import { Select, TextInput, Group, Button } from '@mantine/core'
import useCountries from '../../hooks/useCountries'
import Map from '../Map/Map'

const AddLocation = ({ nextStep, propertyDetails, setPropertyDetails }) => {
    const form = useForm({
        initialValues: {
            country: propertyDetails?.country,
            city: propertyDetails?.city,
            address: propertyDetails?.address,
        },
        validate: {
            country: (value) => validateString(value),
            city: (value) => validateString(value),
            address: (value) => validateString(value),
        },
    })

    const { getAll } = useCountries()

    const { country, city, address } = form.values

    const handleSubmit = () => {
        const { hasErrors } = form.validate()

        if (!hasErrors) {
            setPropertyDetails((prev) => ({ ...prev, city, address, country }))
            nextStep()
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}
        >
            {/* left side */}
            <div
                className="flexCenter"
                style={{
                    gap: '2rem',
                    marginTop: '3rem',
                    justifyContent: 'space-between',
                }}
            >
                <div className="flexColStart" style={{ flex: 1 }}>
                    <Select
                        w={'100%'}
                        withAsterisk
                        label="Country"
                        placeholder="Enter country name"
                        clearable
                        searchable
                        data={getAll()}
                        {...form.getInputProps('country', { type: 'input' })}
                    />
                    <TextInput
                        w={'100%'}
                        withAsterisk
                        label="City"
                        {...form.getInputProps('city', { type: 'input' })}
                    />

                    <TextInput
                        w={'100%'}
                        withAsterisk
                        label="Address"
                        {...form.getInputProps('address', { type: 'input' })}
                    />
                </div>

                {/* Right side  */}
                <div style={{ flex: 1 }}>
                    <Map address={address} country={country} city={city} />
                </div>
            </div>

            <Group justify="center" mt="xl">
                <Button type="submit">Next step</Button>
            </Group>
        </form>
    )
}

export default AddLocation
