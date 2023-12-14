import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js'

// Creation
export const createResidency = asyncHandler(async (req, res) => {
    console.log('Creating residency')

    const {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        userEmail,
    } = req.body.data

    try {
        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price,
                address,
                city,
                country,
                image,
                facilities,
                owner: { connect: { email: userEmail } },
            },
        })

        res.status(201).send({
            message: 'Residency created successfully',
            residency,
        })
    } catch (err) {
        if (err.code === 'P2002') {
            throw new Error('A residency with address is already there')
        }
        throw new Error(err.message)
    }
})

// All residencies

export const getAllResidencies = asyncHandler(async (req, res) => {
    try {
        const residencies = await prisma.residency.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })
        res.send(residencies)
    } catch (err) {
        throw new Error(err.message)
    }
})

// get One residency

export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params

    try {
        const residency = await prisma.residency.findUnique({
            where: { id },
        })

        res.status(201).send(residency)
    } catch (err) {
        throw new Error(err.message)
    }
})

export const getAllMyResidencies = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const results = await prisma.residency.findMany({
            where: {
                userEmail: email,
            },
        })
        res.send(results)
    } catch (error) {
        throw new Error(error.message)
    }
})
