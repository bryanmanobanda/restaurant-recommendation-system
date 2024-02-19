interface PaymentOptions {
    acceptsCreditCards: boolean;
    acceptsDebitCards: boolean;
    acceptsCashOnly: boolean;
    acceptsNfc: boolean;
}

interface Services {
    takeout: boolean;
    delivery: boolean;
    dineIn: boolean;
    curbsidePickup: boolean;
    reservable: boolean;
}

interface Atmosphere {
    outdoorSeating: boolean;
    liveMusic: boolean;
    goodForGroups: boolean;
    goodForWatchingSports: boolean;
    goodForChildren: boolean;
}

interface AccessibilityOptions {
    wheelchairAccessibleParking: boolean;
    wheelchairAccessibleEntrance: boolean;
    wheelchairAccessibleRestroom: boolean;
    wheelchairAccessibleSeating: boolean;
}

interface Information {
    id: string;
    weekdayDescriptions: [string];
    paymentOptions: PaymentOptions;
    services: Services;
    atmosphere: Atmosphere;
    accessibilityOptions: AccessibilityOptions;
}

export default Information;
