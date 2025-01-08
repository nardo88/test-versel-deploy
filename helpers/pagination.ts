type Pagination = {
  page: number
  pageCount: number
}

export const pagination = ({
  page,
  pageCount,
}: {
  page?: string
  pageCount?: string
}): Pagination => {
  let offset = 1
  let limit = 10

  if (page) {
    offset = Number(page)
  }

  if (pageCount) {
    limit = Number(pageCount)
  }

  return { page: offset, pageCount: limit }
}
