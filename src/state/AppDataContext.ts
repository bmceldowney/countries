import React from 'react'

export type AppDataState = {
  byIds: any
  all: PrefilteredCollection
  onlyIsland: PrefilteredCollection
  mostBorders: PrefilteredCollection
  sharedLanguage: PrefilteredCollection
  [id: string]: any
}

export const defaultState: AppDataState = {
  all: { ids: [], mapArray: [], breakData: {} },
  onlyIsland: { ids: [], mapArray: [], breakData: {} },
  mostBorders: { ids: [], mapArray: [], breakData: {} },
  sharedLanguage: { ids: [], mapArray: [], breakData: {} },
  byIds: {}
}

const AppDataContext = React.createContext<AppDataState>(defaultState)
export const AppDataProvider = AppDataContext.Provider
export default AppDataContext

export type BreakData = {
  [id: number]: string
}

export type PrefilteredCollection = {
  ids: []
  mapArray: []
  breakData: BreakData
}