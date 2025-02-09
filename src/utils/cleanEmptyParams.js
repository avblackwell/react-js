import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../components/table'

export const cleanEmptyParams = (search) => {
  const newSearch = { ...search }
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key]
    if (value === undefined || value === '' || (typeof value === 'number' && isNaN(value)))
      delete newSearch[key]
  })

  if (search.pageIndex === DEFAULT_PAGE_INDEX) delete newSearch.pageIndex
  if (search.pageSize === DEFAULT_PAGE_SIZE) delete newSearch.pageSize

  return newSearch
}
