/* eslint-disable @typescript-eslint/explicit-function-return-type */
import firestore from '../firebase'
import { Request, Response } from 'express'

export const getPreferences = async (req: Request, res: Response) => {
  res.json({
    status: 'Restaurantes enviados'
  })

  const querySnapshot = await firestore.collection('turist').get()
  const turistas = querySnapshot.docs.map((doc: { id: any, data: () => any }) => ({
    id: doc.id,
    ...doc.data()
  }))

  console.log('Respuesta recibida', req.body, turistas)
}

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    await firestore.collection('turist').doc(req.params.id).update(req.body)
    res.json({ status: 'Preferences updated' })
  } catch (error) {
    console.error('Error al actualizar preferencias:', error)
    res.status(500).json({ error: 'Error al actualizar preferencias' })
  }
}
