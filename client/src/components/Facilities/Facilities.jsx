/* eslint-disable react/prop-types */
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Group, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import useProperties from '../../hooks/useProperties'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { createResidency } from '../../utils/api.js'

const Facilities = ({
    prevStep,
    propertyDetails,
    setPropertyDetails,
    close,
    setActive,
}) => {
    const form = useForm({
        initialValues: {
            bedrooms: propertyDetails.facilities.bedrooms,
            parkings: propertyDetails.facilities.parkings,
            bathrooms: propertyDetails.facilities.bathrooms,
        },
        validate: {
            bedrooms: (value) => (value < 1 ? 'Must have  one room' : null),
            bathrooms: (value) =>
                value < 1 ? 'Must have  one bathroom' : null,
        },
    })

    const { bedrooms, parkings, bathrooms } = form.values

    const handleSubmit = () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
            setPropertyDetails((prev) => ({
                ...prev,
                facilities: { bedrooms, parkings, bathrooms },
            }))
            mutate()
        }
    }

    // function add property

    const { user } = useAuth0()

    const { refetch: refetchProperties } = useProperties()
    const { mutate, isLoading } = useMutation({
        mutationFn: () =>
            createResidency({
                ...propertyDetails,
                facilities: { bedrooms, parkings, bathrooms },
                userEmail: user?.email,
            }),
        onError: ({ response }) => toast.error(response.data.message),
        onSuccess: (data) => {
            setPropertyDetails({
                title: '',
                description: '',
                price: 0,
                address: '',
                city: '',
                country: '',
                image: '',
                facilities: {
                    bedrooms: 0,
                    parkings: 0,
                    bathrooms: 0,
                },
            })

            close(false)
            setActive(0)
            refetchProperties()
            toast.success(data.message)
        },
    })

    return (
        <Box maw="30%" mx="auto" my="sm">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <NumberInput
                    withAsterisk
                    label="No of Bedrooms"
                    min={0}
                    {...form.getInputProps('bedrooms')}
                />
                <NumberInput
                    label="No of Parkings"
                    min={0}
                    {...form.getInputProps('parkings')}
                />
                <NumberInput
                    withAsterisk
                    label="No of Bathrooms"
                    min={0}
                    {...form.getInputProps('bathrooms')}
                />
                <Group position="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                    <Button type="submit" color="green" disabled={isLoading}>
                        {isLoading ? 'Submitting' : 'Add Property'}
                    </Button>
                </Group>
            </form>
        </Box>
    )
}

export default Facilities