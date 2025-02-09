import { faker } from '@faker-js/faker'

const DEFAULT_PAGE = 0
const DEFAULT_PAGE_SIZE = 10

function makeData(amount) {
  return Array(amount)
    .fill(0)
    .map((_, index) => {
      return {
        id: index + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int(40),
      }
    })
}

const data = makeData(1000)

export async function fetchUsers(filtersAndPagination) {
  console.log('fetchUsers', filtersAndPagination)
  const {
    pageIndex = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    sortBy,
    ...filters
  } = filtersAndPagination
  const requestedData = data.slice()

  if (sortBy) {
    const [field, order] = sortBy.split('.')
    requestedData.sort((a, b) => {
      const aValue = a[field]
      const bValue = b[field]

      if (aValue === bValue) return 0
      if (order === 'asc') return aValue > bValue ? 1 : -1
      return aValue < bValue ? 1 : -1
    })
  }

  const filteredData = requestedData.filter((user) => {
    return Object.keys(filters).every((key) => {
      const filter = filters[key]
      if (filter === undefined || filter === '') return true

      const value = user[key]
      if (typeof value === 'number') return value === +filter

      return value.toLowerCase().includes(`${filter}`.toLowerCase())
    })
  })

  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    result: filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    rowCount: filteredData.length,
  }
}
