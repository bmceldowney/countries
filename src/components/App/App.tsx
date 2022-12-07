import React, { useReducer } from 'react'
import Header from '../Header/Header'
import ModeSelector from '../ModeSelector/ModeSelector'
import GroupSelector from '../GroupSelector/GroupSelector'
import VirtualizedCountryList from '../CountryList/VirtualizedCountryList'
import {
  ScrollDispatch,
  defaultScrollState,
  scrollReducer
} from '../../state/ScrollContext'
import {
  AppStateDispatch,
  defaultAppState,
  appReducer
} from '../../state/AppStateContext'
import './App.css'

const App = () => {
  const [scrollState, scrollDispatch] = useReducer(
    scrollReducer,
    defaultScrollState
  )
  const [appState, appDispatch] = useReducer(appReducer, defaultAppState)

  return (
    <AppStateDispatch.Provider value={appDispatch}>
      <ScrollDispatch.Provider value={scrollDispatch}>
        <div className='App'>
          <Header />
          <ModeSelector props={{ appState }} />
          <GroupSelector props={{ scrollState, appState }} />
          <VirtualizedCountryList props={{ appState }} />
        </div>
      </ScrollDispatch.Provider>
    </AppStateDispatch.Provider>
  )
}

export default App
