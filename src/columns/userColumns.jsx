export const USER_COLUMNS = [
  {
    accessorKey: 'id',
    header: () => <span>ID</span>,
    meta: { filterKey: 'id', filterVariant: 'number' },
  },
  {
    accessorKey: 'firstName',
    header: () => <span>First Name</span>,
    meta: { filterKey: 'firstName' },
  },
  {
    accessorKey: 'lastName',
    header: () => <span>Last Name</span>,
    meta: { filterKey: 'lastName' },
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    meta: { filterKey: 'age', filterVariant: 'number' },
  },
]
