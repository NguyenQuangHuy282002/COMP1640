import CategoryManager from './next/view/categories'
import { Layout } from 'antd'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'

import './index.css'
import AccountManager from './next/view/accounts-manager'
import Login from './next/view/auth/login'
import Dashboard from './next/view/dashboard'
import DepartmentManager from './next/view/departments'
import EventsPage from './next/view/events'
import HomePage from './next/view/home-page'
import CreateIdea from './next/view/ideas/create-new-idea'
import AppFooter from './next/view/layout/footer'
import AppHeader from './next/view/layout/header'
import UserProfile from './next/view/user-profile'
import reportWebVitals from './reportWebVitals'
import React from 'react'
import AppSidebar from './next/view/layout/layout-wrapper/sidebar'
import LayoutWrapper from './next/view/layout/layout-wrapper/LayoutWrapper'

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
              {/* <Layout.Content style={{ background: '#dbdbdb' }}></Layout.Content> */}
              <LayoutWrapper>
              <Outlet />
              </LayoutWrapper>
              {/* <Outlet /> */}
              {/* <AppFooter /> */}
            </Layout>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event" element={<EventsPage />} />
          <Route path="/departments" element={<DepartmentManager />} />
          <Route path="/categories" element={<CategoryManager />} />
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
