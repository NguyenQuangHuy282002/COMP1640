import { Layout, message } from 'antd'
import UnAuthorize from 'next/components/fobidden/unauthorize'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { Http, LOCALSTORAGE } from '../api/http'
import { useAuth } from '../hooks/auth-hook'
import AccountManager from './accounts-manager'
import Login from './auth/login'
import RoleAccess from './auth/role-access'
import { userCredential, userStore } from './auth/user-store'
import CategoryManager from './categories'
import DashboardAdmin from './dashboard'
import DepartmentManager from './departments'
import EventsPage from './events'
import EventDetails from './events/event-details'
import HomePage from './home-page'
import CreateIdea from './ideas/create-new-idea'
import IdeaDetail from './ideas/idea-detail/idea-detail'
import LayoutAdmin from './layout/admin'
import LayoutCoordinator from './layout/coordinator'
import LayoutManager from './layout/manager'
import LayoutStaff from './layout/staff'
import UserProfile from './user-profile'

export default function App() {
  const navigate = useNavigate()
  const { login, logout, token, tokenVerified, userId, role } = useAuth()
  const [verify, setVerify] = useState(false)
  // const [role, setRole] = useState(null)
  useEffect(() => {
    userCredential.updateState({
      userId: userId,
      isLoggedIn: tokenVerified,
      token: token,
      login: login,
      logout: logout,
    })
  })

  useEffect(() => {
    const credential = JSON.parse(localStorage.getItem(LOCALSTORAGE.CREDENTIALS))
    if (credential) {
      if (credential?.token === '' || !credential?.token) {
        navigate('/login')
        return message.info('You need to login to access this application!')
      } else {
        if (credential.tokenVerified === true) {
          setVerify(credential.tokenVerified)
          userCredential.updateState({
            userId: credential.userId,
            isLoggedIn: credential.tokenVerified,
            token: credential.token,
          })

          const updateUserInfo = async () => {
            await Http.get(`/api/v1/users/getProfile/${credential.userId}`)
              .then(res => {
                userStore.updateState(res.data.userInfo)
                // setRole(res.data.userInfo.role)
              })
              .catch(err => console.error(err.message))
          }
          updateUserInfo()
        } else {
          navigate('/login')
          return message.info('You need to login to access this application!')
        }
      }
    } else {
      navigate('/login')
      return message.info('You need to login to access this application!')
    }
  }, [])

  useEffect(() => {
    role && navigate(`/${role}`)
  }, [])

  let routes: any

  if (verify) {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" />
        <Route path="/" element={<Navigate to={role ? `/${role}` : '/'} replace />} />

        <Route
          path="/staff"
          element={
            <RoleAccess roles={['staff']}>
              <Layout style={{ minHeight: '100vh' }}>
                <LayoutStaff>
                  <Outlet />
                </LayoutStaff>
              </Layout>
            </RoleAccess>
          }
        >
          <Route path="" element={<HomePage />} />
          <Route path="event" element={<EventsPage />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="departments" element={<DepartmentManager />} />
          <Route path="ideas" element={<HomePage />} />
          <Route path="account" element={<UserProfile />} />
          <Route path="submit" element={<CreateIdea />} />
          <Route path="idea" element={<IdeaDetail />} />
          <Route path="eventdetail" element={<EventDetails />} />
        </Route>

        <Route
          path="/coordinator"
          element={
            <RoleAccess roles={['coordinator']}>
              <Layout style={{ minHeight: '100vh' }}>
                <LayoutCoordinator>
                  <Outlet />
                </LayoutCoordinator>
              </Layout>
            </RoleAccess>
          }
        >
          <Route path="" element={<HomePage />} />
          <Route path="event" element={<EventsPage />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="departments" element={<DepartmentManager />} />
          <Route path="ideas" element={<HomePage />} />
          <Route path="account" element={<UserProfile />} />
          <Route path="submit" element={<CreateIdea />} />
          <Route path="idea" element={<IdeaDetail />} />
          <Route path="eventdetail" element={<EventDetails />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RoleAccess roles={['admin']}>
              <Layout style={{ minHeight: '100vh' }}>
                <LayoutAdmin>
                  <Outlet />
                </LayoutAdmin>
              </Layout>
            </RoleAccess>
          }
        >
          <Route path="accounts-manager" element={<AccountManager />} />
          <Route path="account" element={<UserProfile />} />
          <Route path="departments" element={<DepartmentManager />} />
          <Route path="" element={<HomePage />} />
          <Route path="ideas" element={<HomePage />} />
          <Route path="idea" element={<IdeaDetail />} />
          <Route path="event" element={<EventsPage />} />
          <Route path="event/:id" element={<EventDetails />} />
        </Route>

        <Route
          path="/manager"
          element={
            <RoleAccess roles={['manager']}>
              <Layout style={{ minHeight: '100vh' }}>
                <LayoutManager>
                  <Outlet />
                </LayoutManager>
              </Layout>
            </RoleAccess>
          }
        >
          <Route path="" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="event" element={<EventsPage />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="ideas" element={<HomePage />} />
          <Route path="submit" element={<CreateIdea />} />
          <Route path="idea" element={<IdeaDetail />} />
          <Route path="ideas" element={<HomePage />} />
          <Route path="account" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Navigate to={role ? `/${role}` : '/'} replace />} />
        <Route path="/unauthorize" element={<UnAuthorize></UnAuthorize>}></Route>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    // <Router>
    <>
      <GlobalStyle />
      {routes}
    </>
    // </Router>
  )
}

const GlobalStyle = createGlobalStyle`
  /* .ant-layout-sider { 
   height: 100vh;
   position: sticky;
  } */
`
