import { UsersController } from '@controllers/users/Users'
import { authStrict } from '@middleware/auth.middleware'
import { Router } from 'express'

export const createUserRouter = (): Router => {
  const router = Router()
  const controller = new UsersController()

  router.get('/get-user', authStrict, controller.getUser)

  return router
}
