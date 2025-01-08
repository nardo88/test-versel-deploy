import { Request, Response } from 'express'
import { signin } from './models/signin'
import { signup } from './models/signup'

export class AuthController {
  signin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const { status, message, token } = await signin({
        email: email.toLowerCase(),
        password,
      })

      if (message) {
        return res.status(status).json({ message })
      }

      res.json({ token })
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }

  signup = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const { status, message } = await signup({
        email: email.toLowerCase(),
        password,
      })

      if (message) {
        return res.status(status).json({ message })
      }

      res.sendStatus(200)
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }
}
