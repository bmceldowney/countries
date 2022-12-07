import React, { useState, useEffect } from 'react'
import dataFetch from '../data/dataFetch'
import { AppDataProvider, defaultState } from '../state/AppDataContext'
import withContext from './withContext'
import { processData } from '../data/dataProcessor'

const withData = (WrappedComponent: JSX.Element) => {
  return () => {
    const [state, setState] = useState(defaultState)

    useEffect(() => {
      const getData = async () => {
        const json = await dataFetch()
        console.log('data fetched')
        const newState = await processData(json)
        setState(newState)
      }

      getData()
    }, [])

    const ContextComponent = withContext(
      WrappedComponent,
      AppDataProvider,
      state
    )

    return <ContextComponent />
  }
}

export default withData
