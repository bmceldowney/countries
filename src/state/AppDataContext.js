import React from 'react'

const AppDataContext = React.createContext({})

export const defaultState = {
  all: { ids: [], mapArray: [], breakData: {} },
  onlyIsland: { ids: [], mapArray: [], breakData: {} },
  mostBorders: { ids: [], mapArray: [], breakData: {} },
  sharedLanguage: { ids: [], mapArray: [], breakData: {} },
  byIds: {}
}

export const AppDataProvider = AppDataContext.Provider
export default AppDataContext
