import { useState } from 'react'
import { favouriteStorageKey, parseFavouriteTools, toggleFavouriteTool } from './additionalSupportState'

/** Explicit preferences only. Never call with ratings, writing, activity or medical data. */
export function useSupportFavourites(allowedIds: readonly string[]) {
  const [state, setState] = useState(() => {
    try { return { ids: parseFavouriteTools(window.localStorage.getItem(favouriteStorageKey), allowedIds), notice: '' } }
    catch { return { ids: [] as string[], notice: 'Browser storage is unavailable. Favourites will last only while this toolbox is open.' } }
  })
  function toggle(id: string) {
    const ids = toggleFavouriteTool(state.ids, id, allowedIds)
    try {
      window.localStorage.setItem(favouriteStorageKey, JSON.stringify(ids))
      setState({ ids, notice: 'Favourite preferences saved in this browser only.' })
    } catch { setState({ ids, notice: 'Favourites could not be saved. This selection lasts only while this toolbox is open.' }) }
  }
  function clear() {
    try { window.localStorage.removeItem(favouriteStorageKey); setState({ ids: [], notice: 'Favourite preferences cleared from this browser.' }) }
    catch { setState({ ids: [], notice: 'Favourites cleared for this view, but browser storage could not be updated.' }) }
  }
  return { ids: state.ids, notice: state.notice, toggle, clear }
}
