interface Location {
    latitude: number;
    longitude: number;
}

interface Restaurant {
    id: string;
    displayName: string;
    primaryCuisine: string;
    shortFormattedAddress: string;
    priceLevel: string;
    rating: number;
    userRatingCount: number;
    websiteUri: string;
    openNow: boolean;
    location: Location;
    photos: { name: string; }[];
    phone: string;
    reviews: {review: string}[];
    score: number;
}

export default Restaurant;