export interface IBody {
  _id: string
  type: string
  value: string
}

export interface ArticleType {
  _id: string
  title: string
  userId: string
  category: string
  description: string
  image: string
  body: IBody[]
  createdAt: string
  updatedAt: string
}
