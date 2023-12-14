import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js'

export const createUser = asyncHandler(async (req, res) => {
    let { email } = req.body

    const userExists = await prisma.user.findUnique({ where: { email: email } })

    if (!userExists) {
        const user = await prisma.user.create({ data: req.body })
        res.send({
            message: 'User registered successfully',
            user: user,
        })
    } else res.status(201).send({ message: 'User already registered' })
})

// get bookVisit residency
export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body
    const { id } = req.params

    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: { email: email },
            select: { bookVisits: true },
        })

        if (alreadyBooked.bookVisits.some((visit) => visit.id === id)) {
            res.status(203).json({
                message: 'This residency is already booked by you',
            })
        } else {
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookVisits: { push: { id, date } },
                },
            })
            res.status(201).send({
                message: 'your visit is booked successfully',
            })
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

// All allBooking

export const allBookings = asyncHandler(async (req, res) => {
    const { email } = req.body

    try {
        const allBookings = await prisma.user.findUnique({
            where: { email: email },
            select: { bookVisits: true },
        })

        res.status(200).send(allBookings)
    } catch (error) {
        throw new Error(error.message)
    }
})

// cancel booking

export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { bookVisits: true },
        })

        const index = user.bookVisits.findIndex((visit) => visit.id === id)

        if (index == -1) {
            res.status(201).json({ message: 'Booking not found' })
        } else {
            user.bookVisits.splice(index, 1)
            await prisma.user.update({
                where: { email },
                data: {
                    bookVisits: user.bookVisits,
                },
            })

            res.status(201).send({ message: 'booking cancelled successfully' })
        }
    } catch (error) {
        throw new Error(error.message)
    }
})

// Add residency in favorite

export const toFav = asyncHandler(async (req, res) => {
    const { rid } = req.params
    const { email } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        })
        if (user.favResidenciesID.includes(rid)) {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid),
                    },
                },
            })
            res.status(201).send({
                message: 'removed from favorites',
                user: updateUser,
            })
        } else {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        push: rid,
                    },
                },
            })

            res.status(201).send({
                message: 'Updated Favorites',
                user: updateUser,
            })
        }
    } catch (error) {
        throw new Error(error.message)
    }
})

// get All favorites
export const allFav = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const favResd = await prisma.user.findUnique({
            where: { email },
            select: { favResidenciesID: true },
        })

        res.status(201).send(favResd)
    } catch (error) {
        throw new Error(error.message)
    }
})
