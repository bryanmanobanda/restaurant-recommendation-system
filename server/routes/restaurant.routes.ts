import express from 'express'
import * as restaurantController from '../controllers/restaurants.controller'
const routerPlaces = express.Router()

routerPlaces.get('/restaurants/:location', restaurantController.getRestaurants);
routerPlaces.post('/recommendations/', restaurantController.getRecommendations);
routerPlaces.post('/information/', restaurantController.getInformation);

export default routerPlaces
