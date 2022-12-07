import React, { FC } from 'react'
import { AppDataState } from '../state/AppDataContext'

const withContext = (WrappedComponent: FC, ContextProvider: React.Provider<{}>, initialState: AppDataState) => {
  return () => {
    return (
      <ContextProvider value={initialState}>
        <WrappedComponent />
      </ContextProvider>
    )
  }
}

export default withContext
