/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Container, Modal, Stepper } from '@mantine/core'
import AddLocation from '../AddLocation/AddLocation'
import { useAuth0 } from '@auth0/auth0-react'
import UploadImage from '../UploadImage/UploadImage'
import BasicDetails from '../BasicDetails/BasicDetails'
import Facilities from '../Facilities/Facilities'

const AddPropertyModal = ({ opened, close }) => {
    const [active, setActive] = useState(0)
    const { user } = useAuth0()

    const [propertyDetails, setPropertyDetails] = useState({
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
        userEmail: user?.email,
    })

    const nextStep = () =>
        setActive((current) => (current < 3 ? current + 1 : current))
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current))

    return (
        <Modal opened={opened} onClose={close} size="60%">
            <Container h={'40rem'} w={'100%'}>
                <Stepper active={active} onStepClick={setActive}>
                    <Stepper.Step label="Location" description="Address">
                        <AddLocation
                            nextStep={nextStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Upload Image" description="Image">
                        <UploadImage
                            nextStep={nextStep}
                            prevStep={prevStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Basics" description="Details.">
                        <BasicDetails
                            nextStep={nextStep}
                            prevStep={prevStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Basics" description="Details.">
                        <Facilities
                            nextStep={nextStep}
                            prevStep={prevStep}
                            propertyDetails={propertyDetails}
                            setPropertyDetails={setPropertyDetails}
                            close={close}
                            setActive={setActive}
                        />
                    </Stepper.Step>
                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>
            </Container>
        </Modal>
    )
}

export default AddPropertyModal
