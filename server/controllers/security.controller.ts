import {auth, firestore} from '../firebase'
import {Request, Response} from 'express'
import {Turista} from "../models/turista.interface";

export const postTurista = async (req: Request, res: Response) => {
    try {
        const nuevoTurista: Turista = req.body as Turista;

        let existingUser;
        try {
            existingUser = await auth.getUserByEmail(nuevoTurista.correo);
        } catch (getUserError) {
            console.error('Error al obtener el usuario:', getUserError);
        }

        if (!existingUser) {

            const userRecord = await auth.createUser({
                email: nuevoTurista.correo
            });

            nuevoTurista.uid = userRecord.uid

            await firestore.collection('turist').doc(userRecord.uid).set(nuevoTurista);

            res.status(201).json({message: '¡Registro exitoso!', nuevoTurista});
        } else {
            res.status(201).json({message: 'El correo se ha registrado previamente.'});
        }
    } catch (error) {
        res.status(500).json({message: 'Error al registrarse'});
    }
};
/*
    const querySnapshot = await firestore.collection('turist').get()
    const turistas = querySnapshot.docs.map((doc: { id: any, data: () => any }) => ({
        id: doc.id,
        ...doc.data()
    }))*/