import dotenv from 'dotenv';
import Restaurant from '../models/restaurant.interface';
import axios from "axios";

dotenv.config();

export default class RestaurantService {
    static async buscarRestaurantesCercanos(location: any): Promise<Restaurant[]> {

        const apiUrl = 'https://places.googleapis.com/v1/places:searchNearby/';
        const apiKey = process.env.GOOGLE_API_KEY;

        const requestBody = {
            includedPrimaryTypes: ['american_restaurant', 'bakery', 'bar', 'barbecue_restaurant', 'brazilian_restaurant', 'breakfast_restaurant', 'brunch_restaurant', 'cafe', 'chinese_restaurant', 'coffee_shop', 'fast_food_restaurant', 'french_restaurant', 'greek_restaurant', 'hamburger_restaurant', 'ice_cream_shop', 'indian_restaurant', 'indonesian_restaurant', 'italian_restaurant', 'japanese_restaurant', 'korean_restaurant', 'lebanese_restaurant', 'meal_delivery', 'meal_takeaway', 'mediterranean_restaurant', 'mexican_restaurant', 'middle_eastern_restaurant', 'pizza_restaurant', 'ramen_restaurant', 'restaurant', 'sandwich_shop', 'seafood_restaurant', 'spanish_restaurant', 'steak_house', 'sushi_restaurant', 'thai_restaurant', 'turkish_restaurant', 'vegan_restaurant', 'vegetarian_restaurant', 'vietnamese_restaurant'],
            maxResultCount: 20,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: location.lat,
                        longitude: location.lng
                    },
                    radius: 5000.0
                }
            }
        };

        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.primaryType,places.displayName.text,places.photos.name,places.shortFormattedAddress,places.currentOpeningHours.openNow,places.priceLevel,places.rating,places.userRatingCount,places.websiteUri,places.location,places.nationalPhoneNumber'
        };

        try {
            const response = await axios.post(apiUrl, requestBody, {headers});

            const restaurants: Restaurant[] = response.data.places.map((result: any) => ({
                id: result.id,
                displayName: result.displayName?.text || '',
                primaryCuisine: result.primaryType || '',
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
                phone: result.nationalPhoneNumber?.text || ''
            }))//.filter((restaurant: Restaurant) => restaurant.openNow);
            return restaurants;
        } catch (error) {
            console.error('Error al buscar restaurantes:', error);
            throw new Error('Error al buscar restaurantes');
        }
    }
}