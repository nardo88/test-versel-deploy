import { Router } from 'express'
import { createAuthRouter } from './auth'
import { createUserRouter } from './users'
import { createArticleRouter } from './articles'

enum RouterEnum {
  AUTH_ROUTERS = 'authRouter',
  USER_ROUTER = 'userRouter',
  CATALOG_ROUTERS = 'catalogRouter',
}

const createRoutes = (): Record<RouterEnum, Router> => {
  const authRouter = createAuthRouter()
  const userRouter = createUserRouter()
  const catalogRouter = createArticleRouter()

  return {
    authRouter,
    userRouter,
    catalogRouter,
  }
}

export default createRoutes
