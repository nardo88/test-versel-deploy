import { ErrorCodes, ErrorMessages } from '@constants/errorCodes'
import { UserData } from '@customTypes/user'
import Users from '@models/Users/Users'
import { Request, Response } from 'express'

export class UsersController {
  getUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.user as UserData
      const current = await Users.findOne(
        { _id: userId },
        { password: 0 }
      ).lean()

      if (!current) {
        return res
          .status(ErrorCodes.NOT_FOUND)
          .json({ message: ErrorMessages.NOT_FOUND })
      }
      return res.json({ ...current })
    } catch (e: any) {
      res
        .status(500)
        .json({ message: 'Что-то пошло не так', details: e.message || e })
    }
  }
}
