import React from 'react'

export const ScrollDispatch = React.createContext(null)

// action types
export const UPDATE_TOP_ITEM_INDEX = 'UPDATE_TOP_ITEM_INDEX'

export const defaultScrollState = {
  topItemIndex: 0
}

export const scrollReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TOP_ITEM_INDEX:
      return { ...state, topItemIndex: action.payload }
    default:
      return state
  }
}
