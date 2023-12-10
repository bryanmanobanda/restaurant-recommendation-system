import express, { Application } from 'express'
import routerPlaces from './routes/place.routes'
import routerSecurity from './routes/security.routes'
import morgan from 'morgan'
import cors from 'cors'

class App {
  public app: Application

  constructor () {
    this.app = express()
    this.config()
    this.routes()
  }

  private config (): void {
    const whitelist = ['http://localhost:4200', 'http://localhost:9876']

    const corsOptions = {
      origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
        if (whitelist.includes(origin as string) || (origin == null)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'), false)
        }
      }
    }

    this.app.use(express.json())
    this.app.use(cors(corsOptions))
    this.app.use(morgan('dev'))
    this.app.use(express.urlencoded({ extended: false }))
  }

  private routes (): void {
    this.app.use(routerPlaces)
    this.app.use(routerSecurity)
  }
}

export default new App().app
