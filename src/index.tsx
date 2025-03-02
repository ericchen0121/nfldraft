import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HashRouter as Router } from 'react-router-dom' // gh-pages doesn't support browser history: https://blog.logrocket.com/deploying-react-apps-github-pages/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './fonts/BarlowCondensed-Bold.ttf'
import './fonts/BarlowCondensed-Medium.ttf'
import './fonts/BarlowCondensed-Regular.ttf'
import './fonts/Lato-Regular.ttf'
import './fonts/Lato-Italic.ttf'
import { Theme } from '@radix-ui/themes'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <React.StrictMode>
        <Theme>
          <App />
        </Theme>
      </React.StrictMode>
    </Router>
  </QueryClientProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
