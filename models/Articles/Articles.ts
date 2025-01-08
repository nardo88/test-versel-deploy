import mongoose, { Schema } from 'mongoose'
import { ArticleType } from './Articles.type'

const ContentSchema = new Schema(
  {
    _id: Schema.Types.String,
    type: {
      type: Schema.Types.String,
      required: true,
    },
    value: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

const ArticlesSchema = new Schema(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    userId: {
      type: Schema.Types.String,
      required: true,
      ref: 'Users',
    },
    category: {
      type: Schema.Types.String,
      required: true,
    },
    description: { type: Schema.Types.String },
    image: { type: Schema.Types.String },
    body: [ContentSchema],
  },
  {
    timestamps: true,
    collection: 'articles',
    versionKey: false,
    autoCreate: true,
  }
)

export default mongoose.model<ArticleType & mongoose.Document>(
  'Articles',
  ArticlesSchema
)
