import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { cleanEmptyParams } from '../utils/cleanEmptyParams'

export function useFilters(routeId) {
  const routeApi = getRouteApi(routeId)
  const navigate = useNavigate()
  const filters = routeApi.useSearch()

  const setFilters = (partialFilters) =>
    navigate({
      search: (prev) => cleanEmptyParams({ ...prev, ...partialFilters }),
    })
  const resetFilters = () => navigate({ search: {} })

  return { filters, setFilters, resetFilters }
}
