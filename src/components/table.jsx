import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, Text, Group, UnstyledButton } from '@mantine/core'
import { IconSortDescending, IconSortAscending } from '@tabler/icons-react'
import { DebouncedInput } from './DebouncedInput'
export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  )
}

export default function TanTable({
  data,
  columns,
  pagination,
  paginationOptions,
  filters,
  onFilterChange,
  sorting,
  onSortingChange,
}) {
  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onSortingChange,
    ...paginationOptions,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table withTableBorder>
        {/* this is where the regular Sort button Header goes */}
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const fieldMeta = header.column.columnDef.meta
                return (
                  <Table.Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <IconSortAscending />,
                            desc: <IconSortDescending />,
                            false: ' 🔃',
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                        {header.column.getCanFilter() && fieldMeta?.filterKey !== undefined ? (
                          <DebouncedInput
                            onChange={(value) => {
                              onFilterChange({
                                [fieldMeta.filterKey]: value,
                              })
                            }}
                            placeholder="Search..."
                            type={fieldMeta.filterVariant === 'number' ? 'number' : 'text'}
                            value={filters[fieldMeta.filterKey] ?? ''}
                          />
                        ) : null}
                      </>
                    )}
                  </Table.Th>
                )
              })}
            </Table.Tr>
            
          ))}
        </Table.Thead>
        {/* this is where the filters go */}
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const fieldMeta = header.column.columnDef.meta
                return (
                  <Table.Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <IconSortAscending />,
                            desc: <IconSortDescending />,
                            false: ' 🔃',
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                        {header.column.getCanFilter() && fieldMeta?.filterKey !== undefined ? (
                          <DebouncedInput
                            onChange={(value) => {
                              onFilterChange({
                                [fieldMeta.filterKey]: value,
                              })
                            }}
                            placeholder="Search..."
                            type={fieldMeta.filterVariant === 'number' ? 'number' : 'text'}
                            value={filters[fieldMeta.filterKey] ?? ''}
                          />
                        ) : null}
                      </>
                    )}
                  </Table.Th>
                )
              })}
            </Table.Tr>
            
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Table.Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                  )
                })}
              </Table.Tr>
            )
          })}
        </Table.Tbody>
      </Table>
      <div className="flex items-center gap-2 my-2">
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
