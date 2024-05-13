import dotenv from 'dotenv';
import Restaurant from '../models/restaurant.interface';
import axios from "axios";

dotenv.config();

export default class WatsonService {
    static async analizarSentimientos(restaurants: Restaurant[]): Promise<Restaurant[]> {

        for (const restaurant of restaurants) {
            let totalScore = 0;

            for (const comentario of restaurant.reviews) {
                const parameters = {
                    "text": comentario.review,
                    "features": {
                        "sentiment": {}
                    }
                };

                const url = 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/b25adb05-1241-45c4-a168-d56af957bca6/v1/analyze?version=2022-04-07';
                const auth = {
                    username: 'apikey',
                    password: process.env.IBM_API_KEY || ""
                };

                try {
                    const response = await axios.post(url, parameters, { auth, headers: { 'Content-Type': 'application/json' } });
                    totalScore += response.data.sentiment.document.score;
                } catch (error) {
                    console.error('Error al hacer la petición:', error);
                }
            }

            restaurant.score = totalScore / restaurant.reviews.length;
        }
        return restaurants.sort((a, b) => b.score - a.score);
    }
}