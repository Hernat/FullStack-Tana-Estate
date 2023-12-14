import jwtCheck from '../config/auth0Config.js'
import express from 'express'
import {
    createResidency,
    getAllResidencies,
    getResidency,
    getAllMyResidencies,
} from '../controllers/residencyController.js'

const router = express.Router()

router.post('/create', createResidency)
router.get('/allResidencies', getAllResidencies)
router.get('/:id', getResidency)
router.post('/myResidencies', getAllMyResidencies)

export { router as residencyRoute }
