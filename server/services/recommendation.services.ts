import Restaurant from "../models/restaurant.interface";

export default class RecommendationServices {

    static calculateCuisineVector(restaurants: Restaurant[]): Map<string, number[]> {
        const cuisineMap: Map<string, number[]> = new Map();

        for (const restaurant of restaurants) {
            for (const cuisine of restaurant.cuisine) {
                if (!cuisineMap.has(cuisine)) {
                    cuisineMap.set(cuisine, new Array(restaurants.length).fill(0));
                }
                const index = parseInt(restaurant.id) - 1;
                cuisineMap.get(cuisine)![index] = 1;
            }
        }

        return cuisineMap;
    }

    static calculateSimilarity(userQuery: any, restaurant: Restaurant, cuisineMap: Map<string, number[]>): number {
        const userCuisineVector = userQuery.cuisine.map((cuisine: string) => cuisineMap.get(cuisine) || new Array(cuisineMap.size).fill(0))
            .reduce((acc: number[], val: number[]) => acc.map((v, i) => v + val[i]), []);

        const restaurantCuisineVector = restaurant.cuisine.map((cuisine: string) => cuisineMap.get(cuisine) || new Array(cuisineMap.size).fill(0))
            .reduce((acc: number[], val: number[]) => acc.map((v, i) => v + val[i]), []);

        const dotProduct = userCuisineVector.map((val: number, i: number) => val * restaurantCuisineVector[i]).reduce((acc: any, val: any) => acc + val, 0);
        const magnitudeUser = Math.sqrt(userCuisineVector.map((val: number) => val * val).reduce((acc: any, val: any) => acc + val, 0));
        const magnitudeRestaurant = Math.sqrt(restaurantCuisineVector.map(val => val * val).reduce((acc, val) => acc + val, 0));

        const cosineSimilarity = dotProduct / (magnitudeUser * magnitudeRestaurant);
        return cosineSimilarity;
    }

    static recommendRestaurants(userQuery: any, restaurants: Restaurant[], numRecommendations: number): Restaurant[] {
        const cuisineMap = RecommendationServices.calculateCuisineVector(restaurants);

        const restaurantSimilarities: { restaurant: Restaurant, similarity: number }[] = [];

        for (const restaurant of restaurants) {
            const similarity = RecommendationServices.calculateSimilarity(userQuery, restaurant, cuisineMap);
            restaurantSimilarities.push({restaurant, similarity});
        }

        // Ordenar por similitud en orden descendente
        restaurantSimilarities.sort((a, b) => b.similarity - a.similarity);

        // Obtener las mejores recomendaciones
        const recommendations = restaurantSimilarities.slice(0, numRecommendations).map(item => item.restaurant);
        return recommendations;
    }
}
