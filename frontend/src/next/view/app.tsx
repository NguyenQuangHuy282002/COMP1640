import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import CategoryManager from './categories'
// import './index.css'
import { Layout, message } from 'antd'
import { Http, LOCALSTORAGE } from '../api/http'
import { useAuth } from '../hooks/auth-hook'
import AccountManager from './accounts-manager'
import Login from './auth/login'
import { userCredential, userStore } from './auth/user-store'
import DepartmentManager from './departments'
import EventsPage from './events'
import HomePage from './home-page'
import CreateIdea from './ideas/create-new-idea'
import IdeaDetail from './ideas/idea-detail/idea-detail'
import LayoutWrapper from './layout/layout-wrapper'
import UserProfile from './user-profile'
import DashboardAdmin from './dashboard'
import EventDetails from './events/event-details'
import LayoutAdmin from './layout/admin'
import LayoutManager from './layout/manager'
import RoleAccess from './auth/role-access'

export default function App() {
  const navigate = useNavigate()
  const { login, logout, token, tokenVerified, userId } = useAuth()
  const [verify, setVerify] = useState(false)
  const [role, setRole] = useState(null)
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
    // const { state, setState } = useSubscription(userStore);
    const userId = JSON.parse(localStorage.getItem(LOCALSTORAGE.USER))

    if (userId) {
      // dispatch(user);
      const updateUserInfo = async () => {
        await Http.get(`/api/v1/users/getProfile/${userId}`)
          .then(res => {
            userStore.updateState(res.data.userInfo)
            setRole(res.data.userInfo.role)
          })
          .catch(err => console.error(err.message))
      }
      updateUserInfo()

      role && navigate(`/${role}`)
    }
  }, [])

  let routes: any

  if (verify) {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" />
        <Route path="/" element={<Navigate to={role ? `/${role}` : '/login'} replace />} />

        <Route
          path="/staff"
          element={
            <RoleAccess roles={['staff']}>
              <Layout>
                <LayoutWrapper>
                  <Outlet />
                </LayoutWrapper>
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
              <Layout>
                <LayoutWrapper>
                  <Outlet />
                </LayoutWrapper>
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
              <Layout>
                <LayoutAdmin>
                  <Outlet />
                </LayoutAdmin>
              </Layout>
            </RoleAccess>
          }
        >
          <Route path="accounts-manager" element={<AccountManager />} />
          <Route path="account" element={<UserProfile />} />
          <Route path="" element={<HomePage />} />
          <Route path="ideas" element={<HomePage />} />
        </Route>

        <Route
          path="/manager"
          element={
            <RoleAccess roles={['manager']}>
              <Layout>
                <LayoutManager>
                  <Outlet />
                </LayoutManager>
              </Layout>
            </RoleAccess>
          }
        >
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="" element={<HomePage />} />
          <Route path="event" element={<EventsPage />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="departments" element={<DepartmentManager />} />
          <Route path="ideas" element={<HomePage />} />
          <Route path="submit" element={<CreateIdea />} />
          <Route path="idea" element={<IdeaDetail />} />
          <Route path="ideas" element={<HomePage />} />
          <Route path="account" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Navigate to={role ? `/${role}` : '/login'} replace />} />
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
    <>{routes}</>
    // </Router>
  )
}
