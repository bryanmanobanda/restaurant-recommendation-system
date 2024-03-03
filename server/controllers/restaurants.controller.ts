import {Request, Response} from "express";
import RestaurantService from "../services/restaurant.services";
import Restaurant from "../models/restaurant.interface";
import RecommendationServices from "../services/recommendation.services";
import InformationService from "../services/information.service";
import RoutesService from "../services/routes.service";
import {firestore} from "../firebase";
import {Turista} from "../models/turista.interface";
/*
        // Falta que los filtros cambien de acuerdo a lo que se selecciona
        // Falta mostrar los restaurantes que se realiza la busqueda
        // Falta que muestre la vista anterior sin hacer la consulta
        // Falta volver a los restaurantes recomendados sin hacer la consulta.
        // Falta actualizar en el mapa los restaurantes.
        // hacer la búsqueda de las preferencias en firestore, cuisines filtrar por los de mayor peso
*/
export const postRestaurants = async (req: Request, res: Response) => {
    try {
        const uid = req.body.uid;
        const location = req.body.location;
        const radio = req.body.radio

        const restaurants = await RestaurantService.buscarRestaurantesCercanos(location, radio);

        const userSnapshot = await firestore.collection('turist').doc(uid).get();
        const user_Profile = userSnapshot.data() as Turista;

        if (user_Profile) {
            const cocinaMap = user_Profile.cocina || {};
            const nivelPrecioMap = user_Profile.nivel_precio || {};
            const calidadServicioMap = user_Profile.calidad_servicio || {};

            const topCocina = obtenerTopClaves(cocinaMap, 3);
            const topNivelPrecio = obtenerTopClaves(nivelPrecioMap, 3);
            const topCalidadServicio = obtenerTopClaves(calidadServicioMap, 3);

            const cocina = convertirMapaAClaveValor(topCocina, cocinaMap);
            const nivelPrecio = convertirMapaAClaveValor(topNivelPrecio, nivelPrecioMap);
            const calidadServicio = convertirMapaAClaveValor(topCalidadServicio, calidadServicioMap);

            const user_ProfileActualizado: Turista = {
                ...user_Profile,
                cocina: cocina,
                nivel_precio: nivelPrecio,
                calidad_servicio: calidadServicio
            };

            res.status(200).json({ restaurants, user_Profile: user_ProfileActualizado });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Problema al buscar restaurantes y perfil de usuario' });
    }
};

const convertirMapaAClaveValor = (claves: string[], mapa: any): { [key: string]: number } => {
        const claveValor: { [key: string]: number } = {};
    claves.forEach(clave => {
        claveValor[clave] = mapa[clave] || 0;
    });
    return claveValor;
};


export const postInformation = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const information = await InformationService.buscarInformacionRestaurante(id);
        res.status(200).json({information});
    } catch (error) {
        res.status(500).json({error: 'Problema al obtener informacion del restaurante'});
    }
}

export const postRoutes = async (req: Request, res: Response) => {
    try {
        const origin = {"location": req.body.location}
        const destination = {"placeId": req.body.placeId}
        const travelMode = req.body.travelMode
        const route = await RoutesService.getRouteRestaurant(origin, destination, travelMode);
        res.status(200).json({route});
    } catch (error) {
        res.status(500).json({error: 'Problema al obtener ruta del restaurante'});
    }
}

export const getRecommendations = async (req: Request, res: Response) => {}
    const obtenerTopClaves = (mapa: any, n: number) => {
        const claves = Object.keys(mapa);
        claves.sort((a, b) => mapa[b] - mapa[a]);
        return claves.slice(0, n);
    }