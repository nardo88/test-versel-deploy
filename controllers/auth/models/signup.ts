import { ErrorCodes, ErrorMessages } from '@constants/errorCodes'
import { createId } from '@helpers/createId'
import { validateEmail } from '@helpers/validateEmail'
import Users from '@models/Users/Users'
import bcrypt from 'bcryptjs'

interface IOptions {
  email: string
  password: string
}

interface IOutputData {
  status: number
  message?: string
}

export async function signup(options: IOptions): Promise<IOutputData> {
  try {
    const { email, password } = options

    const candidate = await Users.findOne({ email }, { _id: 1 }).lean()

    if (candidate) {
      return {
        status: ErrorCodes.BAD_REQUEST,
        message: ErrorMessages.ALREADY_EXISTS,
      }
    }

    if (!validateEmail(email) || !password.trim()) {
      return {
        status: ErrorCodes.BAD_REQUEST,
        message: ErrorMessages.INVALID_DATA,
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new Users({
      _id: createId(),
      email,
      password: hashedPassword,
    })

    await user.save()

    return {
      status: 201,
    }
  } catch (e: any) {
    throw new Error(e)
  }
}
