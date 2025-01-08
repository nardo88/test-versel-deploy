import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface IPayload {
  userId: string
  roles: string[]
}

const secret = process.env.JWT_SECRET as string

export const createJWT = (payload: IPayload) => jwt.sign(payload, secret)
