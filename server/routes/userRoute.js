import jwtCheck from '../config/auth0Config.js'
import express from 'express'
import {
    createUser,
    bookVisit,
    allBookings,
    cancelBooking,
    toFav,
    allFav,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/bookVisit/:id', bookVisit)
router.post('/allBookings', allBookings)
router.post('/removeBooking/:id', cancelBooking)
router.post('/toFav/:rid', toFav)
router.post('/allFav', allFav)

export { router as userRoute }
