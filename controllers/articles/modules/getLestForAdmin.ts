import Articles from '@models/Articles/Articles'

interface IOptions {
  page: number
  limit: number
  category?: string
  title?: string
}

interface IArticle {
  id: string
  title: string
  category: string
  createdAt: number
  updatedAt: number
}

interface IOutputData {
  list: IArticle[]
  total: number
}

export const getLestForAdmin = async (
  options: IOptions
): Promise<IOutputData> => {
  try {
    const { page, limit, category = '', title = '' } = options

    const articles = await Articles.aggregate([
      {
        $match: {
          category: { $regex: category, $options: 'i' },
          title: { $regex: title, $options: 'i' },
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },

      {
        $facet: {
          data: [
            {
              $skip: (page - 1) * Number(limit),
            },
            {
              $limit: Number(limit),
            },
            {
              $project: {
                id: '$_id',
                _id: 0,
                title: 1,
                category: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],
          total: [
            {
              $count: 'count',
            },
          ],
        },
      },
      {
        $project: {
          data: 1,
          total: {
            $arrayElemAt: ['$total.count', 0],
          },
        },
      },
    ])

    return {
      list: articles[0].data || [],
      total: articles[0].total || 0,
    }
  } catch (e: any) {
    throw new Error(e)
  }
}
