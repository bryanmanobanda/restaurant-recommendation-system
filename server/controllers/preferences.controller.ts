import {firestore} from '../firebase'
import { Request, Response } from 'express'
import {Preferencias} from "../models/preferences.interface";

export const postPreferences = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const nuevaPreferencia: Preferencias = req.body;
    nuevaPreferencia.turistaUid = ''

    const preferencesRef = firestore.collection('preferencias');

    const docRef = await preferencesRef.add(nuevaPreferencia);

    await docRef.update({ uid: docRef.id });

    res.status(201).json({ message: 'Preferencias almacenadas con éxito', docId: docRef.id });
  } catch (error) {
    console.error('Error al guardar preferencias:', error);
    res.status(500).json({ error: 'Error al guardar preferencias' });
  }
}
