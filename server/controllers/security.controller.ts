import {auth, firestore} from '../firebase'
import {Request, Response} from 'express'
import {Turista} from "../models/turista.interface";

export const postTurista = async (req: Request, res: Response) => {
    let nuevoTurista : Turista = {
        uid: req.body.user.uid,
        nombre: req.body.user.nombre,
        correo:req.body.user.correo,
        foto: req.body.user.foto,
        cocina: {},
        calidad_servicio: {},
        nivel_precio: {}
    }
    let token = req.body.token
    await auth.verifyIdToken(token)
      .then(async () => {
            await firestore.collection('turist').doc(nuevoTurista.uid).set(nuevoTurista);
            res.status(201).json({message: '¡Registro exitoso!', nuevoTurista});
        })
        .catch((error) => {
            res.status(500).json({message: 'Error al registrarse'});
        });
};