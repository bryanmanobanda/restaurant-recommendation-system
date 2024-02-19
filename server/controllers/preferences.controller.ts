import {firestore} from '../firebase'
import {Request, Response} from 'express'
import {Preferencias} from "../models/preferences.interface";

export const postPreferences = async (req: Request, res: Response) => {
    try {
        const nuevaPreferencia: Preferencias = req.body;

        // Comprobamos si la clave de cocina está presente y no es un array vacío
        if (nuevaPreferencia.cocina && nuevaPreferencia.cocina.length > 0) {
            // Si hay valores en la clave de cocina, los agregamos a las preferencias
            const preferencias = {
                calidad_servicio: nuevaPreferencia.rating,
                cocina: nuevaPreferencia.cocina,
                nivel_precio: nuevaPreferencia.nivelPrecio
            }
            await firestore.collection('turist').doc(nuevaPreferencia.uid).collection('preferences').add(preferencias);
        } else {
            // Si la clave de cocina no está presente o es un array vacío, no la agregamos a las preferencias
            const preferencias = {
                calidad_servicio: nuevaPreferencia.rating,
                nivel_precio: nuevaPreferencia.nivelPrecio
            }
            await firestore.collection('turist').doc(nuevaPreferencia.uid).collection('preferences').add(preferencias);
        }

        const userRef = firestore.collection('turist').doc(nuevaPreferencia.uid);
        const userSnapshot = await userRef.get();
        const userData = userSnapshot.data();

        if (userData) {
            const cocina = actualizarMapa(userData.cocina, nuevaPreferencia.cocina);
            const nivelPrecio = actualizarMapa(userData.nivel_precio, nuevaPreferencia.nivelPrecio);
            const calidadServicio = actualizarMapa(userData.calidad_servicio, nuevaPreferencia.rating);

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
        if (clave !== '') {
            mapaActualizado[clave] = (mapaActualizado[clave] || 0) + 1;
        } else {
            // Si el valor es '', indicamos "valor no especificado"
            mapaActualizado['valor no especificado'] = (mapaActualizado['valor no especificado'] || 0) + 1;
        }
    }

    return mapaActualizado;
};
