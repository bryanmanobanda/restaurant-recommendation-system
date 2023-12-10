import express from 'express'
import * as userController from '../controllers/preferences.controller'
const routerPlaces = express.Router()

routerPlaces.post('/api/places', userController.postPreferences)
// router.post('/update/preferences/:id', userController.updatePreferences);

export default routerPlaces
