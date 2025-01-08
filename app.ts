import 'module-alias/register'
import express, { Request, Response } from 'express'
import passport from 'passport'
import mongoose from 'mongoose'
import cors from 'cors'
import createRoutes from './routes'

import dotenv from 'dotenv'
dotenv.config()

const PORT = 5000
const mongoUrl =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/conspects'

const app = express()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

app.use(express.json())
app.use(passport.initialize())

const routers = createRoutes()

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'welcome to my app' })
})
app.use('/api/v1', routers.authRouter)
app.use('/api/v1/users', routers.userRouter)
app.use('/api/v1/articles', routers.catalogRouter)

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Rout not found' })
})

async function start() {
  try {
    await mongoose.connect(mongoUrl)

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
