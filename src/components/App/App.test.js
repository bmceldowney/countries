import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { AppDataProvider, defaultState } from '../../state/AppDataContext'

const renderApp = () => {
  return render(
    <AppDataProvider value={defaultState}>
      <App />
    </AppDataProvider>
  )
}

test('renders the header', () => {
  const { getByText } = renderApp()

  const element = getByText(/countries of the world/i)
  expect(element).toBeInTheDocument()
})
