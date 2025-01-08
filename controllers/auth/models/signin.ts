import { ErrorCodes } from '@constants/errorCodes'
import { createJWT } from '@helpers/createJWT'
import Users from '@models/Users/Users'
import bcrypt from 'bcryptjs'

interface IOptions {
  email: string
  password: string
}

interface IOutput {
  status: number
  message?: string
  token?: string
}

export async function signin(options: IOptions): Promise<IOutput> {
  try {
    const { email, password } = options
    const user = await Users.findOne(
      { email },
      { password: 1, roles: 1 }
    ).lean()

    if (!user) {
      return {
        status: ErrorCodes.NOT_FOUND,
        message: 'user not found',
      }
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return {
        status: ErrorCodes.BAD_REQUEST,
        message: 'invalid data',
      }
    }

    const jwt = createJWT({ userId: user._id, roles: user.roles })

    return {
      status: 200,
      token: jwt,
    }
  } catch (e: any) {
    throw new Error(e)
  }
}
