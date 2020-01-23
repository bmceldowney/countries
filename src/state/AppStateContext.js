import React from 'react'

export const AppStateDispatch = React.createContext(null)

// action types
export const UPDATE_CURRENT_MODE = 'UPDATE_CURRENT_MODE'
export const UPDATE_GROUP_ITEM_INDEX = 'UPDATE_GROUP_ITEM_INDEX'

export const possibleModes = [
  { name: 'all', dataKey: 'all' },
  {
    name: 'only islands',
    dataKey: 'onlyIsland'
  },
  {
    name: 'border count',
    dataKey: 'mostBorders'
  },
  {
    name: 'shared language',
    dataKey: 'sharedLanguage'
  }
]

export const defaultAppState = {
  currentModeIndex: 0,
  currentGroupItemIndex: 0
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_MODE:
      return { ...state, currentModeIndex: action.payload }
    case UPDATE_GROUP_ITEM_INDEX:
      return { ...state, currentGroupItemIndex: action.payload }
    default:
      return state
  }
}
