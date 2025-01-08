import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ErrorCodes } from '@constants/errorCodes'
import { UserData } from '@customTypes/user'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

export function authStrict(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.method === 'OPTIONS') {
      return next()
    }

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new Error()
    }

    const decoded = jwt.verify(token, JWT_SECRET) as UserData

    req.user = decoded
    next()
  } catch (e) {
    res.status(ErrorCodes.NOT_AUTH).json({ message: 'not auth' })
  }
}
