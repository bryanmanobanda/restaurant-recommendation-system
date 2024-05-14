import dotenv from 'dotenv';
import Information from '../models/information.interface';
import axios from "axios";

dotenv.config();

export default class InformationService {
    static async buscarInformacionRestaurante(id: any): Promise<Information> {
        const apiUrl = `https://places.googleapis.com/v1/places/${id}`;
        const apiKey = process.env.GOOGLE_API_KEY;
        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'currentOpeningHours.weekdayDescriptions,takeout,curbsidePickup,delivery,dineIn,reservable,outdoorSeating,goodForChildren,goodForGroups,goodForWatchingSports,liveMusic,paymentOptions,accessibilityOptions'
        };

        try {
            const response = await axios.get(apiUrl, {headers});
            return {
                id: id,
                weekdayDescriptions: response.data?.currentOpeningHours?.weekdayDescriptions || [],
                paymentOptions: {
                    acceptsCreditCards: response.data?.paymentOptions?.acceptsCreditCards || false,
                    acceptsDebitCards: response.data?.paymentOptions?.acceptsDebitCards || false,
                    acceptsCashOnly: response.data?.paymentOptions?.acceptsCashOnly || false,
                    acceptsNfc: response.data?.paymentOptions?.acceptsNfc || false
                } || {},
                services: {
                    takeout: response.data?.takeout || false,
                    delivery: response.data?.delivery || false,
                    dineIn: response.data?.dineIn || false,
                    curbsidePickup: response.data?.curbsidePickup || false,
                    reservable: response.data?.reservable || false
                } || {},
                atmosphere: {
                    outdoorSeating: response.data?.outdoorSeating || false,
                    liveMusic: response.data?.liveMusic || false,
                    goodForGroups: response.data?.goodForGroups || false,
                    goodForWatchingSports: response.data?.goodForWatchingSports || false,
                    goodForChildren: response.data?.goodForChildren || false
                } || {},
                accessibilityOptions: {
                    wheelchairAccessibleParking: response.data?.accessibilityOptions?.wheelchairAccessibleParking || false,
                    wheelchairAccessibleEntrance: response.data?.accessibilityOptions?.wheelchairAccessibleEntrance || false,
                    wheelchairAccessibleRestroom: response.data?.accessibilityOptions?.wheelchairAccessibleRestroom || false,
                    wheelchairAccessibleSeating: response.data?.accessibilityOptions?.wheelchairAccessibleSeating || false
                } || {}
            }

        } catch (error) {
            throw new Error('Error al obtener informacion de restaurante');
        }
    }
}