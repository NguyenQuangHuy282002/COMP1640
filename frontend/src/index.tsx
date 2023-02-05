import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './view/auth/login'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={1} preventDuplicate>
      <Router>
        <Routes>
          <Route path="/" element={<></>}>
            <Route path="messages" element={<></>} />
            <Route path="tasks" element={<></>} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout" />
        </Routes>
      </Router>
    </SnackbarProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
