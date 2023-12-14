/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import { Group, Button } from '@mantine/core'

import './UploadImage.css'

const UploadImage = ({
    nextStep,
    prevStep,
    propertyDetails,
    setPropertyDetails,
}) => {
    const [imageURL, setImageURL] = useState(propertyDetails?.image)

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'dowpcc03x',
                uploadPreset: 'usdc9pan',
                maxFiles: 1,
            },
            (err, result) => {
                if (result.event == 'success') {
                    setImageURL(result.info.secure_url)
                }
            }
        )
    }, [])

    const handleNext = () => {
        setPropertyDetails((prev) => ({ ...prev, image: imageURL }))
        nextStep()
    }

    return (
        <div className="flexColCenter uploadWrapper">
            {!imageURL ? (
                <div
                    className="flexColCenter uploadZone"
                    onClick={() => widgetRef.current?.open()}
                >
                    <FaFileUpload size={30} color="grey" />
                    <span>Upload Image</span>
                </div>
            ) : (
                <div
                    className="uploadedImage"
                    onClick={() => widgetRef.current?.open()}
                >
                    <img src={imageURL} alt="property" />
                </div>
            )}

            <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                    Back{' '}
                </Button>
                <Button onClick={handleNext} disabled={!imageURL}>
                    Next step
                </Button>
            </Group>
        </div>
    )
}

export default UploadImage
