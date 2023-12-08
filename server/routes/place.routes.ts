/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import * as userController from '../controllers/preferences.controller'
const router = express.Router()

router.get('/api/places', userController.getPreferences)
// router.post('/update/preferences/:id', userController.updatePreferences);

export default router
