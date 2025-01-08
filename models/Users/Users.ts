import mongoose, { Schema } from 'mongoose'
import { UsersType } from './Users.type'

const UsersSchema = new Schema(
  {
    _id: Schema.Types.String,
    email: {
      type: Schema.Types.String,
      require: true,
      unique: true,
    },
    profile: {
      name: Schema.Types.String,
      surname: Schema.Types.String,
      middlename: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
      require: true,
    },
    roles: {
      type: [Schema.Types.String],
      enum: ['user', 'admin'],
      default: ['user'],
    },
    createdAt: Schema.Types.Number,
    updatedAt: Schema.Types.Number,
  },
  {
    timestamps: true,
    collection: 'users',
    versionKey: false,
  }
)

export default mongoose.model<UsersType & mongoose.Document>(
  'Users',
  UsersSchema
)
