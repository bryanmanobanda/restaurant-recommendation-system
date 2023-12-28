interface Location {
    latitude: number;
    longitude: number;
}

interface Restaurant {
    id: string;
    displayName: string;
    shortFormattedAddress: string;
    priceLevel: string;
    rating: number;
    userRatingCount: number;
    websiteUri: string;
    openNow: boolean;
    location: Location;
    photos: { name: string; }[];
    cuisine: string[]; //agregar telefono y primary type
}

export default Restaurant;
