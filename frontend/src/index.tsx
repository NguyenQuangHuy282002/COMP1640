import { Layout } from 'antd'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import AccountManager from './view/accounts-manager'
import Login from './view/auth/login'
import Dashboard from './view/dashboard'
import EventsPage from './view/events'
import HomePage from './view/home-page'
import CreateIdea from './view/ideas/create-new-idea'
import AppFooter from './view/layout/footer'
import AppHeader from './view/layout/header'
import UserProfile from './view/user-profile'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
    <SnackbarProvider maxSnack={1} preventDuplicate>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" />
          <Route
            path="/"
            element={
              <Layout>
                <AppHeader />
                <Layout.Content style={{ background: '#dbdbdb' }}></Layout.Content>
                <Outlet />
                <AppFooter />
              </Layout>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event" element={<EventsPage />} />
            <Route path="/departments" element={<UserProfile />} />
            <Route path="/categories" element={<UserProfile />} />
            <Route path="/accounts-manager" element={<AccountManager />} />
            <Route path="/ideas" element={<UserProfile />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/submit" element={<CreateIdea />} />
          </Route>
        </Routes>
      </Router>
    </SnackbarProvider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
