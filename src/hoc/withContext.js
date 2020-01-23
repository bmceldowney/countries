import React from 'react'

const withContext = (WrappedComponent, ContextProvider, initialState) => {
  return () => {
    return (
      <ContextProvider value={initialState}>
        <WrappedComponent />
      </ContextProvider>
    )
  }
}

export default withContext
