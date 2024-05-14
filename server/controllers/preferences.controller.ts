import {firestore} from '../firebase'
import {Request, Response} from 'express'
import {Preferencias} from "../models/preferences.interface";

export const postPreferences = async (req: Request, res: Response) => {
    try {
        const nuevaPreferencia: Preferencias = req.body;

        if (nuevaPreferencia?.cuisines && nuevaPreferencia?.cuisines.length > 0) {
            const preferencias = {
                calidad_servicio: nuevaPreferencia?.ratings,
                cocina: nuevaPreferencia?.cuisines,
                nivel_precio: nuevaPreferencia?.prices
            }
            await firestore.collection('turist').doc(nuevaPreferencia.uid).collection('preferences').add(preferencias);
        } else {
            const preferencias = {
                calidad_servicio: nuevaPreferencia?.ratings,
                nivel_precio: nuevaPreferencia?.prices
            }
            await firestore.collection('turist').doc(nuevaPreferencia.uid).collection('preferences').add(preferencias);
        }

        const userRef = firestore.collection('turist').doc(nuevaPreferencia.uid);
        const userSnapshot = await userRef.get();
        const userData = userSnapshot.data();

        if (userData) {
            const cocina = actualizarMapa(userData.cocina, nuevaPreferencia?.cuisines);
            const nivelPrecio = actualizarMapa(userData.nivel_precio, nuevaPreferencia?.prices);
            const calidadServicio = actualizarMapa(userData.calidad_servicio, nuevaPreferencia?.ratings);

            await userRef.update({
                cocina,
                nivel_precio: nivelPrecio,
                calidad_servicio: calidadServicio
            });
        }
        res.status(201).json({ message: 'Preferencias almacenadas con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar preferencias' });
    }
};

const actualizarMapa = (mapaExistente: any, nuevosValores: any) => {
    const mapaActualizado: any = { ...mapaExistente };
    if (Array.isArray(nuevosValores)) {
        nuevosValores.forEach((valor: string) => {
            mapaActualizado[valor] = (mapaActualizado[valor] || 0) + 1;
        });
    } else {
        const clave = nuevosValores as string;
        if (clave !== ' ') {
            mapaActualizado[clave] = (mapaActualizado[clave] || 0) + 1;
        } else {
            mapaActualizado['Any'] = (mapaActualizado['Any'] || 0) + 1;
        }
    }
    return mapaActualizado;
};