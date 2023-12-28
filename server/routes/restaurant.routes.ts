import express from 'express'
import * as restaurantController from '../controllers/restaurants.controller'

const routerPlaces = express.Router()

routerPlaces.get('/restaurants/:location', restaurantController.getRestaurants);
routerPlaces.post('/recommendations/', restaurantController.getRecommendations);
routerPlaces.post('/information', restaurantController.postInformation);
routerPlaces.post('/routes', restaurantController.postRoutes);

export default routerPlaces
