import {Request, Response} from "express";
import RestaurantService from "../services/restaurant.services";
import Restaurant from "../models/restaurant.interface";
import RecommendationServices from "../services/recommendation.services";
import InformationService from "../services/information.service";
import RoutesService from "../services/routes.service";

export const getRestaurants = async (req: Request, res: Response) => {
    try {

        const locationParams = req.params.location.split(',');

        let location = {
            latitude: parseFloat(locationParams[0]),
            longitude: parseFloat(locationParams[1])
        }
        const restaurants = await RestaurantService.buscarRestaurantesCercanos(location);

        res.status(200).json({restaurants});
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los restaurantes'});
    }
}

export const postInformation = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const information = await InformationService.buscarInformacionRestaurante(id);
        res.status(200).json({information});

    } catch (error) {
        res.status(500).json({error: 'Error al obtener informacion del restaurante'});
    }
}

export const postRoutes = async (req: Request, res: Response) => {
    try {
        const origin = {"location": req.body.location}
        const destination = {"placeId": req.body.placeId}
        const route = await RoutesService.getRouteRestaurant(origin, destination);
        res.status(200).json({route});

    } catch (error) {
        res.status(500).json({error: 'Error al obtener ruta del restaurante'});
    }
}

export const getRecommendations = async (req: Request, res: Response) => {
    try {

        /*    const locationParams = req.params.location.split(',');

            let location = {
                latitude: parseFloat(locationParams[0]),
                longitude: parseFloat(locationParams[1])*/
        //}
        //const restaurants = await RestaurantService.buscarRestaurantesCercanos(location);*/
        // Ejemplo de uso
        const userQuery = {
            rating: 3,
            priceLevel: 'moderado',
            cuisine: ['mexicana', 'coffee']
        };

        const restaurants: Restaurant[] = [
            {
                id: '1',
                displayName: 'Restaurante Italiano',
                shortFormattedAddress: 'Calle Principal 123',
                priceLevel: 'Medio',
                rating: 4.5,
                userRatingCount: 120,
                websiteUri: 'https://www.ejemplo.com',
                openNow: true,
                location: {
                    latitude: 40.7128,
                    longitude: -74.0060
                },
                photos: [
                    {name: 'foto1.jpg'},
                    {name: 'foto2.jpg'}
                ],
                cuisine: ['italiana', 'pasta', 'pizza']
            },
            {
                id: '2',
                displayName: 'Restaurante Mexicano',
                shortFormattedAddress: 'Avenida Principal 456',
                priceLevel: 'Económico',
                rating: 4.0,
                userRatingCount: 90,
                websiteUri: 'https://www.ejemplo.com/mexicano',
                openNow: false,
                location: {
                    latitude: 34.0522,
                    longitude: -118.2437
                },
                photos: [
                    {name: 'foto3.jpg'},
                    {name: 'foto4.jpg'}
                ],
                cuisine: ['mexicana', 'tacos', 'enchiladas']
            },
            {
                id: '3',
                displayName: 'Restaurante Mexicano',
                shortFormattedAddress: 'Avenida Principal 456',
                priceLevel: 'Económico',
                rating: 4.0,
                userRatingCount: 90,
                websiteUri: 'https://www.ejemplo.com/mexicano',
                openNow: false,
                location: {
                    latitude: 34.0522,
                    longitude: -118.2437
                },
                photos: [
                    {name: 'foto3.jpg'},
                    {name: 'foto4.jpg'}
                ],
                cuisine: ['ecuatoriana']
            }
            // Agregar más restaurantes si es necesario
        ];
        const numRecommendations = 3;
        const recommendedRestaurants = RecommendationServices.recommendRestaurants(userQuery, restaurants, numRecommendations);
        console.log("Recomendaciones:", recommendedRestaurants.map(restaurant => restaurant.id));

        res.status(200).json({message: "Estoy viendo que sirve"});
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los restaurantes'});
    }
}