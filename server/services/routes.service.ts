import dotenv from 'dotenv';
import axios from "axios";
import Route from "../models/route.interface";

dotenv.config();

export default class RoutesService {
    static async getRouteRestaurant(origin: any, destination: any, travelMode: any): Promise<Route> {
        const apiUrl = "https://routes.googleapis.com/directions/v2:computeRoutes";
        const apiKey = process.env.GOOGLE_API_KEY;

        const requestBody = {
            "origin": origin,
            "destination": destination,
            "travelMode": travelMode,
            "computeAlternativeRoutes": false,
            "routeModifiers": {
                "avoidTolls": false,
                "avoidHighways": false,
                "avoidFerries": false
            },
            "languageCode": "en-US",
            "units": "METRIC"
        };

        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
        };

        try {
            const response = await axios.post(apiUrl, requestBody, {headers});
            return {
                id: destination.placeId,
                distanceMeters: response.data.routes[0].distanceMeters || undefined,
                duration: response.data.routes[0].duration || "",
                polyline: response.data.routes[0].polyline.encodedPolyline || "",
                travel: travelMode || ""
            }
        } catch (error) {
            throw new Error('Error al obtener la ruta del restaurante');
        }
    }
}