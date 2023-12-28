import express from 'express'
import * as security from '../controllers/security.controller'

const routerSecurity = express.Router()

routerSecurity.post('/registrarUsuario', security.postTurista)

export default routerSecurity