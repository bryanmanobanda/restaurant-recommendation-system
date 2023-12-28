import dotenv from 'dotenv';
import Restaurant from '../models/restaurant.interface';
import axios from "axios";

dotenv.config();

export default class RestaurantService {
    static async buscarRestaurantesCercanos(location: any): Promise<Restaurant[]> {

        const apiUrl = 'https://places.googleapis.com/v1/places:searchNearby/';
        const apiKey = process.env.GOOGLE_API_KEY;

        const requestBody = {
            includedPrimaryTypes: ['restaurant'],
            maxResultCount: 2,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: location.latitude,
                        longitude: location.longitude
                    },
                    radius: 5000.0
                }
            }
        };

        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName.text,places.photos.name,places.shortFormattedAddress,places.currentOpeningHours.openNow,places.priceLevel,places.rating,places.userRatingCount,places.websiteUri,places.location'
        };

        try {
            const response = await axios.post(apiUrl, requestBody, {headers});

            const restaurants: Restaurant[] = response.data.places.map((result: any) => ({
                id: result.id,
                displayName: result.displayName?.text || '',
                shortFormattedAddress: result.shortFormattedAddress || '',
                openNow: result.currentOpeningHours?.openNow || false,
                priceLevel: result.priceLevel || '',
                rating: result.rating || undefined,
                userRatingCount: result.userRatingCount || undefined,
                websiteUri: result.websiteUri || '',
                location: {
                    latitude: result.location.latitude || undefined,
                    longitude: result.location.longitude || undefined,
                },
                photos: result.photos?.map((photo: any) => ({name: photo.name})) || [],
            })).filter((restaurant: Restaurant) => restaurant.openNow);
            return restaurants;
        } catch (error) {
            console.error('Error al buscar restaurantes:', error);
            throw new Error('Error al buscar restaurantes');
        }
    }
}