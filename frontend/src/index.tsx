import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Login from './view/auth/login'
import Dashboard from './view/dashboard'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={1} preventDuplicate>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="user" element={<></>} />
            <Route path="category" element={<></>} />
          </Route>
          <Route path="/login" element={<Login />} />
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
