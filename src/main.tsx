import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import withData from './hoc/withData'

const InitializedApp = withData(App)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InitializedApp />
  </React.StrictMode>
)