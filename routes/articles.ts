import { ArticleController } from '@controllers/articles'
import { authStrict } from '@middleware/auth.middleware'
import { Router } from 'express'

export const createArticleRouter = (): Router => {
  const router = Router()
  const controller = new ArticleController()

  router.get('/', authStrict, controller.getList)
  router.get('/get-one/:id', authStrict, controller.getForView)
  router.get('/catalog', controller.getCatalog)
  router.get('/get-for-edit/:id', authStrict, controller.getForEdit)
  router.get('/preview', authStrict, controller.preview)

  router.post('/create', authStrict, controller.create)
  router.put('/update/:id', authStrict, controller.update)
  router.delete('/remove/:id', authStrict, controller.remove)

  return router
}
