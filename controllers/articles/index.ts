import { Request, Response } from 'express'
import { getCatalog } from './modules/getCatalog'
import { ErrorCodes, ErrorMessages } from '../../constants/errorCodes'
import { pagination } from '@helpers/pagination'
import { escapingCharacters } from '@helpers/escapingCharacters'
import { getLestForAdmin } from './modules/getLestForAdmin'
import { UserData } from '@customTypes/user'
import Articles from '@models/Articles/Articles'
import { createId } from '@helpers/createId'

export class ArticleController {
  getCatalog = async (req: Request, res: Response) => {
    try {
      const { page, pageCount } = pagination(req.query)
      const { filter } = req.query

      const { data, total } = await getCatalog({
        page,
        pageCount,
        filter: escapingCharacters(filter?.toLocaleString()),
      })

      res.json({ data, total })
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }
  getList = async (req: Request, res: Response) => {
    try {
      const { roles } = req.user as UserData
      if (!roles.includes('admin')) {
        return res.status(403).json({ message: 'Access denied' })
      }
      const { page, pageCount } = pagination(req.query)
      const { category = '', title = '' } = req.query
      const { list, total } = await getLestForAdmin({
        page,
        limit: pageCount,
        category: escapingCharacters(category.toLocaleString()),
        title: escapingCharacters(title.toLocaleString()),
      })

      return res.json({ list, total })
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }
  getForEdit = async (req: Request, res: Response) => {
    try {
      const { roles } = req.user as UserData
      if (!roles.includes('admin')) {
        return res.status(403).json({ message: 'Access denied' })
      }
      const { id } = req.params

      const article = await Articles.findOne({ _id: id }).lean()

      return res.json({ ...article })
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }

  getForView = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const article = await Articles.findOne({ _id: id }, { body: 1 }).lean()

      return res.json(article?.body || [])
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const { category, title, body, description, image } = req.body
      const { userId, roles } = req.user as UserData

      if (!roles.includes('admin')) {
        return res
          .status(ErrorCodes.FORBIDDEN)
          .json({ message: ErrorMessages.FORBIDDEN })
      }

      const newArticle = new Articles({
        _id: createId(),
        category,
        title,
        userId,
        body,
        description,
        image,
      })

      await newArticle.save()
      return res.status(201).json({ id: newArticle._id })
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }

  remove = async (req: Request, res: Response) => {
    try {
      const { roles } = req.user as UserData
      const { id } = req.params
      if (!roles.includes('admin')) {
        return res
          .status(ErrorCodes.FORBIDDEN)
          .json({ message: ErrorMessages.FORBIDDEN })
      }

      await Articles.findOneAndDelete({ _id: id })

      return res.sendStatus(200)
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { category, title, body, description, image } = req.body
      const { id } = req.params

      const { userId, roles } = req.user as UserData

      if (!roles.includes('admin')) {
        return res
          .status(ErrorCodes.FORBIDDEN)
          .json({ message: ErrorMessages.FORBIDDEN })
      }

      await Articles.findOneAndUpdate(
        { _id: id },
        {
          category,
          title,
          userId,
          body,
          description,
          image,
        }
      )

      return res.sendStatus(200)
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }

  preview = async (req: Request, res: Response) => {
    try {
      const articles = await Articles.aggregate([
        {
          $project: {
            id: '$_id',
            _id: 0,
            title: 1,
            category: 1,
          },
        },
        {
          $group: {
            _id: '$category',
            titles: {
              $push: {
                title: '$title',
                id: '$id',
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ])

      res.json(articles)
    } catch (e: any) {
      res
        .status(500)
        .json({ details: e.message, message: 'Что то пошло не так!' })
    }
  }
}
