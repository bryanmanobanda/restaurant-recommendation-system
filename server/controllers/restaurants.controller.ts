import {Request, Response} from "express";
import RestaurantService from "../services/restaurant.services";
import Restaurant from "../models/restaurant.interface";
import RecommendationServices from "../services/recommendation.services";
import InformationService from "../services/information.service";
import RoutesService from "../services/routes.service";
import {firestore} from "../firebase";
import {Turista} from "../models/turista.interface";
/*
export const postRestaurants = async (req: Request, res: Response) => {
    try {
        const uid = req.body.uid
        const location = req.body.location

        //formula matematica para dividir el cuadrado en 4 partes y hacer una busqueda
        //probar el algoritmo dibujando en el mapa
        //gregar un add a la lista de restaurantes

        // Falta que los filtros cambien de acuerdo a lo que se selecciona
        // Falta mostrar los restaurantes que se realiza la busqueda
        // Falta que muestre la vista anterior sin hacer la consulta
        // Falta volver a los restaurantes recomendados sin hacer la consulta.
        // Falta actualizar en el mapa los restaurantes.
        const restaurants = await RestaurantService.buscarRestaurantesCercanos(location);
        // hacer la búsqueda de las preferencias en firestore, cuisines filtrar por los de mayor peso
        const user = await firestore.collection('turist').doc(uid).get();
        let user_Profile = user.data()
        if (user_Profile) {
            const cocinaMap = user_Profile.cocina || {};
            const nivelPrecioMap = user_Profile.nivel_precio || {};
            const calidadServicioMap = user_Profile.calidad_servicio || {};

            const topCocina = obtenerTopClaves(cocinaMap, 3);
            const topNivelPrecio = obtenerTopClaves(nivelPrecioMap, 3);
            const topCalidadServicio = obtenerTopClaves(calidadServicioMap, 3);

            user_Profile = {
                uid: user_Profile.uid,
                nombre: user_Profile.nombre,
                correo: user_Profile.correo,
                foto: "",
                cocina: topCocina,
                nivel_precio: topNivelPrecio,
                calidad_servicio: topCalidadServicio
            };
        }
        console.log(user_Profile)
            res.status(200).json({restaurants, user_Profile});
        }
    catch
        (error)
        {
            res.status(500).json({error: 'Problema al buscar restaurantes y perfil de usuario'});
        }
    }
*/
export const postRestaurants = async (req: Request, res: Response) => {
    try {
        const uid = req.body.uid;
        const location = req.body.location;

        const restaurants = await RestaurantService.buscarRestaurantesCercanos(location);

        const userSnapshot = await firestore.collection('turist').doc(uid).get();
        const user_Profile = userSnapshot.data() as Turista;

        if (user_Profile) {
            const cocinaMap = user_Profile.cocina || {};
            const nivelPrecioMap = user_Profile.nivel_precio || {};
            const calidadServicioMap = user_Profile.calidad_servicio || {};

            const topCocina = obtenerTopClaves(cocinaMap, 3);
            const topNivelPrecio = obtenerTopClaves(nivelPrecioMap, 3);
            const topCalidadServicio = obtenerTopClaves(calidadServicioMap, 3);

            // Convertir los mapas en formato clave-valor
            const cocina = convertirMapaAClaveValor(topCocina, cocinaMap);
            const nivelPrecio = convertirMapaAClaveValor(topNivelPrecio, nivelPrecioMap);
            const calidadServicio = convertirMapaAClaveValor(topCalidadServicio, calidadServicioMap);

            // Construir el perfil de usuario con los datos actualizados
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
        claveValor[clave] = mapa[clave] || 0; // Si no hay valor definido, asignar 0
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
        const route = await RoutesService.getRouteRestaurant(origin, destination);
        res.status(200).json({route});
    } catch (error) {
        res.status(500).json({error: 'Problema al obtener ruta del restaurante'});
    }
}

export const getRecommendations = async (req: Request, res: Response) => {}
    const obtenerTopClaves = (mapa: any, n: number) => {
        const claves = Object.keys(mapa);
        claves.sort((a, b) => mapa[b] - mapa[a]); // Ordenar las claves según el valor en el mapa
        return claves.slice(0, n);
    }