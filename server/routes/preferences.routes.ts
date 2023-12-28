import express from 'express'
import * as userController from '../controllers/preferences.controller'

const routerPreferences = express.Router()

routerPreferences.post('/preferences', userController.postPreferences)

export default routerPreferences
